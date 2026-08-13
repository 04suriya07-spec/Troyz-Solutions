import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';

class ContextEngineClass {
  
  constructor() {
    // Listen to ALL events to potentially update context
    EventBus.subscribe('*', this.evaluateContext.bind(this));
  }

  private evaluateContext(event: WorldEvent) {
    // The Context Engine only cares about sensory input events for now
    if (['LOCATION_CHANGED', 'WEATHER_CHANGED', 'TIME_CHANGED', 'HEALTH_UPDATE'].includes(event.type)) {
      
      const state = useGameState.getState();
      // In a real app, we would cross-reference state.world, state.device, etc.
      // But since we are driving this from the WorldEventConsole payloads right now:

      let newContext: string | null = null;
      let contextData: any = {};

      // ─ Vacation / Travel Context ─
      if (event.type === 'LOCATION_CHANGED' && event.payload.type === 'transit_hub') {
        newContext = 'traveling';
        contextData = { origin: event.payload.location };
      }

      // ─ Workout Context ─
      if (event.type === 'HEALTH_UPDATE' && event.payload.heartRate > 110) {
        newContext = 'workout_session';
        contextData = { intensity: 'high' };
      }

      // ─ Cozy / Reading Context ─
      if (event.type === 'WEATHER_CHANGED' && event.payload.condition === 'rain') {
        newContext = 'cozy_weather';
        contextData = { suggestion: 'perfect time for INT quests' };
      }

      // Publish the context if we figured something out!
      if (newContext) {
        EventBus.publish('CONTEXT_IDENTIFIED', { context: newContext, data: contextData });
      }
    }
  }

  // A method we can call to manually initialize the engine listeners
  public start() {
    console.log('[ContextEngine] Started and listening to EventBus...');
  }
}

export const ContextEngine = new ContextEngineClass();
