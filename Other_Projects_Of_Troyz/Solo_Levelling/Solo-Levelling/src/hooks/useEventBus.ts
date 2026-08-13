import { useEffect } from 'react';
import { EventBus, EventType, type WorldEvent } from '../engines/event/EventEngine';

export function useEventBus(type: EventType | '*', callback: (event: WorldEvent) => void) {
  useEffect(() => {
    const unsubscribe = EventBus.subscribe(type, callback);
    return () => unsubscribe();
  }, [type, callback]);
}
