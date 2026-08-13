import React from 'react';
import { EventBus } from '../engines/event/EventEngine';
import { CloudRain, MapPin, Sun, Activity, Zap, Terminal } from 'lucide-react';

export default function WorldEventConsole() {
  
  const handleTrigger = (type: any, payload: any) => {
    EventBus.publish(type, payload);
  };

  const debugEvents = [
    { 
      label: 'Walked 5km', icon: <MapPin size={16} />, type: 'LOCATION_CHANGED', 
      payload: { distance: 5, unit: 'km', location: 'City Streets' } 
    },
    { 
      label: 'Arrived at Airport', icon: <MapPin size={16} />, type: 'LOCATION_CHANGED', 
      payload: { location: 'Chennai International Airport', type: 'transit_hub' } 
    },
    { 
      label: 'Heavy Rain', icon: <CloudRain size={16} />, type: 'WEATHER_CHANGED', 
      payload: { condition: 'rain', intensity: 'heavy' } 
    },
    { 
      label: 'Sunrise', icon: <Sun size={16} />, type: 'TIME_CHANGED', 
      payload: { period: 'dawn', hour: 6 } 
    },
    { 
      label: 'Health Check (HR 120)', icon: <Activity size={16} />, type: 'HEALTH_UPDATE', 
      payload: { heartRate: 120, status: 'active' } 
    }
  ];

  return (
    <div style={{
      background: 'rgba(8, 13, 26, 0.8)', borderRadius: '16px', padding: '20px',
      border: '1px dashed rgba(255, 42, 95, 0.4)', display: 'flex', flexDirection: 'column', gap: '16px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Terminal color="#ff2a5f" size={24} />
        <div>
          <h3 style={{ margin: 0, color: '#ff2a5f', fontSize: '18px', fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
            WORLD EVENT EMITTER [DEBUG]
          </h3>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
            Simulate real-world sensory inputs to test Event Engine logic.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {debugEvents.map((ev, i) => (
          <button 
            key={i}
            onClick={() => handleTrigger(ev.type, ev.payload)}
            style={{
              background: 'rgba(255, 42, 95, 0.1)', border: '1px solid rgba(255, 42, 95, 0.3)',
              borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              transition: 'all 0.2s', fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 42, 95, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 42, 95, 0.1)'}
          >
            {ev.icon}
            {ev.label}
          </button>
        ))}
      </div>
    </div>
  );
}
