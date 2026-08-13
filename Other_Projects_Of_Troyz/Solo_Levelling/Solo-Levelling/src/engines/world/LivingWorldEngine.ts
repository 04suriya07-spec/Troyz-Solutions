import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';
import { LORE_WORLD_EVENTS } from '../../content/lore/world_events';

class LivingWorldEngineClass {

    // Simple time thresholds for testing
    private readonly TIME_THRESHOLDS = {
        Morning: 0,       // Start of day (0 mins)
        Afternoon: 30,    // 30 mins in
        Evening: 60,      // 60 mins in
        Night: 90         // 90 mins in
    };

    constructor() {
        EventBus.subscribe('CLOCK_TICK', this.processTick.bind(this));
    }

    private processTick(event: WorldEvent) {
        const { gameTimeMinutes } = event.payload;
        const state = useGameState.getState();
        let stateUpdated = false;
        const updates: any = {};

        // 1. Time Engine: Determine Time of Day (looping every 120 game minutes)
        const dayCycle = gameTimeMinutes % 120;
        let newTimeOfDay = state.world.timeOfDay;

        if (dayCycle >= this.TIME_THRESHOLDS.Night) newTimeOfDay = 'Night';
        else if (dayCycle >= this.TIME_THRESHOLDS.Evening) newTimeOfDay = 'Evening';
        else if (dayCycle >= this.TIME_THRESHOLDS.Afternoon) newTimeOfDay = 'Afternoon';
        else newTimeOfDay = 'Morning';

        if (newTimeOfDay !== state.world.timeOfDay) {
            updates.timeOfDay = newTimeOfDay;
            stateUpdated = true;
            EventBus.publish('CUSTOM', { 
                action: 'add_log', 
                message: `The world shifts to ${newTimeOfDay}.`, 
                logType: 'info' 
            });
        }

        // 2. Weather Engine (Simplified: Random change every 60 game minutes)
        if (gameTimeMinutes > 0 && gameTimeMinutes % 60 === 0) {
            const weathers = ['Clear', 'Rain', 'Cloudy', 'Storm'];
            const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
            if (randomWeather !== state.world.weather) {
                updates.weather = randomWeather;
                stateUpdated = true;
                EventBus.publish('CUSTOM', { 
                    action: 'add_log', 
                    message: `Weather changed to ${randomWeather}.`, 
                    logType: 'info' 
                });
            }
        }

        // 3. Event Engine (Check Calendar and Time constraints)
        // E.g., Meteor shower only happens at night.
        let activeEvents = [...state.world.activeEvents];
        let eventsChanged = false;

        for (const [id, eventLore] of Object.entries(LORE_WORLD_EVENTS)) {
            const isNightEvent = eventLore.timeCondition === 'Night';
            
            if (isNightEvent && newTimeOfDay === 'Night') {
                if (!activeEvents.includes(id)) {
                    activeEvents.push(id);
                    eventsChanged = true;
                    EventBus.publish('CUSTOM', { 
                        action: 'add_log', 
                        message: `World Event Started: ${eventLore.title}`, 
                        logType: 'success' 
                    });
                }
            } else if (isNightEvent && newTimeOfDay !== 'Night') {
                if (activeEvents.includes(id)) {
                    activeEvents = activeEvents.filter(e => e !== id);
                    eventsChanged = true;
                    EventBus.publish('CUSTOM', { 
                        action: 'add_log', 
                        message: `World Event Ended: ${eventLore.title}`, 
                        logType: 'warning' 
                    });
                }
            }
        }

        if (eventsChanged) {
            updates.activeEvents = activeEvents;
            stateUpdated = true;
        }

        // Apply updates
        if (stateUpdated) {
            state.updateWorldState(updates);
            EventBus.publish('WORLD_STATE_CHANGED', { state: state.world });
        }
    }

    public start() {
        console.log('[LivingWorldEngine] Online. The universe is breathing.');
    }
}

export const LivingWorldEngine = new LivingWorldEngineClass();
