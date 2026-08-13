import { EventBus } from '../event/EventEngine';

class SimulationClockClass {
    private timerId: any = null;
    
    // For testing: 1 real second = 1 game minute.
    // 60 real seconds = 1 game hour.
    // Tick every 1 second.
    private TICK_RATE_MS = 1000; 
    
    // We simulate time passing
    private gameTimeMinutes = 0;

    public start() {
        if (this.timerId) return;
        
        console.log('[SimulationClock] Clock is ticking...');
        this.timerId = setInterval(() => {
            this.gameTimeMinutes += 1;
            
            EventBus.publish('CLOCK_TICK', { 
                gameTimeMinutes: this.gameTimeMinutes 
            });
            
        }, this.TICK_RATE_MS);
    }

    public stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}

export const SimulationClock = new SimulationClockClass();
