import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  icon?: React.ReactNode;
}

export default function PlaceholderView({ title, icon }: PlaceholderViewProps) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      background: 'rgba(8, 13, 26, 0.6)',
      borderRadius: '16px',
      border: '1px solid rgba(0, 229, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      minHeight: '400px'
    }}>
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: 'rgba(0, 229, 255, 0.1)', filter: 'blur(60px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '40%', height: '40%', background: 'rgba(168, 85, 247, 0.1)', filter: 'blur(40px)', borderRadius: '50%' }} />

      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 229, 255, 0.1)', 
          border: '2px solid rgba(0, 229, 255, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: '#00e5ff', boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)'
        }}>
          {icon || <AlertCircle size={40} />}
        </div>
        
        <div>
          <h2 style={{ fontFamily: 'Rajdhani', fontSize: '32px', fontWeight: '700', color: '#fff', letterSpacing: '2px', margin: '0 0 8px 0', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
            {title.toUpperCase()}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '300px', margin: 0, lineHeight: 1.5 }}>
            This system module is currently locked or under construction. 
          </p>
        </div>

        <button style={{ 
          marginTop: '16px', padding: '12px 24px', background: 'rgba(168, 85, 247, 0.1)', 
          border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', color: '#c084fc',
          fontSize: '12px', fontWeight: '600', letterSpacing: '1px',
          cursor: 'not-allowed', opacity: 0.8
        }}>
          SYSTEM LOCKED
        </button>
      </div>
    </div>
  );
}
