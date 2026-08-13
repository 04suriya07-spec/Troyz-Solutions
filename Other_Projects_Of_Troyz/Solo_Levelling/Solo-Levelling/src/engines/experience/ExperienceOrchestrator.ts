import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';

class ExperienceOrchestratorClass {

    constructor() {
        EventBus.subscribe('LEVEL_UP', this.handleLevelUp.bind(this));
        EventBus.subscribe('WORLD_EVENT_STARTED', this.handleWorldEvent.bind(this));
        EventBus.subscribe('QUEST_COMPLETED', this.handleQuestCompleted.bind(this));
        EventBus.subscribe('CLOCK_TICK', this.handleClockTick.bind(this));
    }

    private handleLevelUp(event: WorldEvent) {
        const state = useGameState.getState();
        
        // Trigger cinematic and orb state
        state.updateExperienceState({
            activeCinematic: 'level_up',
            orbState: 'GoldenExplosion',
            theme: 'Gold'
        });

        // Automatically dismiss cinematic after 4 seconds
        setTimeout(() => {
            const currentState = useGameState.getState();
            if (currentState.experience.activeCinematic === 'level_up') {
                currentState.updateExperienceState({
                    activeCinematic: null,
                    orbState: 'Idle',
                    theme: 'Default'
                });
            }
        }, 4000);
    }

    private handleWorldEvent(event: WorldEvent) {
        const state = useGameState.getState();
        const eventId = event.payload.eventId;

        if (eventId === 'event_meteor_shower') {
            state.updateExperienceState({ theme: 'Neon', orbState: 'Thinking' });
        } else if (eventId === 'event_city_marathon') {
            state.updateExperienceState({ theme: 'Morning', hudMode: 'IronBody' });
        } else if (eventId === 'event_boss_spawn') {
            state.updateExperienceState({ theme: 'Crimson', orbState: 'RedAura' });
        }
    }

    private handleQuestCompleted(event: WorldEvent) {
        const state = useGameState.getState();
        
        // Brief pulse on quest completion
        state.updateExperienceState({ orbState: 'Pulse' });

        setTimeout(() => {
            state.updateExperienceState({ orbState: 'Idle' });
        }, 1500);
    }

    private handleClockTick(event: WorldEvent) {
        const state = useGameState.getState();
        const { timeOfDay } = event.payload;
        const { dailyPhase } = state.experience;

        // Auto transition into evening reflection when night hits if we are in active day
        if (timeOfDay === 'Night' && dailyPhase === 'ActiveDay') {
            state.updateExperienceState({ dailyPhase: 'EveningReflection', orbState: 'Thinking' });
        }
    }

    public advanceDailyPhase() {
        const state = useGameState.getState();
        const { dailyPhase } = state.experience;

        switch (dailyPhase) {
            case 'Wake':
                state.updateExperienceState({ dailyPhase: 'MorningBrief', orbState: 'Breathing' });
                break;
            case 'MorningBrief':
                state.updateExperienceState({ dailyPhase: 'ActiveDay', orbState: 'Idle' });
                break;
            case 'EveningReflection':
                state.updateExperienceState({ dailyPhase: 'Sleep', orbState: 'Idle', theme: 'Default' });
                break;
            case 'Sleep':
                state.updateExperienceState({ dailyPhase: 'Wake' });
                break;
            default:
                break;
        }
    }

    public start() {
        console.log('[ExperienceOrchestrator] Online. The UI is breathing.');
    }
}

export const ExperienceOrchestrator = new ExperienceOrchestratorClass();
