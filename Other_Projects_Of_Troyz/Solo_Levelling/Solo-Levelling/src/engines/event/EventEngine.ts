export type EventType = 
  | "QUEST_COMPLETED" 
  | "QUEST_FAILED" 
  | "LOCATION_CHANGED" 
  | "TIME_CHANGED" 
  | "WEATHER_CHANGED" 
  | "HEALTH_UPDATE" 
  | "CALENDAR_EVENT" 
  | "STAT_UPGRADED"
  | "DECISION_MADE"
  | "WEEK_PASSED"
  | "MONTH_PASSED"
  | "CHRONICLE_CREATED"
  | "CLOCK_TICK"
  | "WORLD_EVENT_STARTED"
  | "CONTEXT_IDENTIFIED"
  | "LEVEL_UP"
  | "MEMORY_CAPTURED"
  | "GENERATE_QUEST"
  | "SOCIAL_RECONNECT_NEEDED"
  | "WORLD_STATE_CHANGED"
  | "CUSTOM";

export interface WorldEvent {
  id: string;
  type: EventType;
  timestamp: number;
  payload: any;
}

type EventCallback = (event: WorldEvent) => void;

class EventBusClass {
  private listeners: Record<string, EventCallback[]> = {};

  // Subscribe to a specific event type, or '*' for all events
  subscribe(type: EventType | '*', callback: EventCallback): () => void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);
    };
  }

  // Publish an event to all interested listeners
  publish(type: EventType, payload: any) {
    const event: WorldEvent = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      timestamp: Date.now(),
      payload
    };

    console.log(`[EventBus] ${type}`, payload);

    // Notify specific listeners
    if (this.listeners[type]) {
      this.listeners[type].forEach(cb => {
        try { cb(event); } catch (e) { console.error(`Error in listener for ${type}`, e); }
      });
    }

    // Notify wildcard listeners (e.g. Analytics Engine)
    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => {
        try { cb(event); } catch (e) { console.error(`Error in wildcard listener`, e); }
      });
    }
  }
}

export const EventBus = new EventBusClass();

// Dummy export to satisfy esbuild value import constraints without verbatimModuleSyntax
export const WorldEvent = {};
