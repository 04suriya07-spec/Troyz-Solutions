import React from 'react';
import { Package } from 'lucide-react';
import { useGameState } from '../engines/state/StateEngine';

export default function InventoryView() {
  const { player } = useGameState();
  const inventory = player.inventory || [];

  return (
    <div style={{ padding: '32px', color: 'white', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em', color: '#00e5ff' }}>INVENTORY</h2>
      
      {inventory.length === 0 ? (
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '16px',
          padding: '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <Package size={48} opacity={0.5} />
          <p>Your inventory is currently empty.</p>
          <p style={{ fontSize: '12px' }}>Purchase items from the System Store to fill your inventory.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {inventory.map((item, index) => (
            <div key={index} style={{
              background: 'rgba(4, 7, 16, 0.8)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ fontSize: '32px' }}>🎁</div>
              <div style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
