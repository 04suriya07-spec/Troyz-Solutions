import React, { useState } from 'react';
import { Bell, Search, MessageCircle, Menu } from 'lucide-react';

interface TopBannerProps {
  questCount: number;
  incompleteQuests: number;
  latestLog?: string;
  latestXp?: number;
  gold?: number;
  onMenuClick?: () => void;
}

export default function TopBanner({
  questCount,
  incompleteQuests,
  latestLog,
  latestXp,
  gold,
  onMenuClick,
}: TopBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <style>{`
        .top-banner-responsive {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 48px;
          background: rgba(10,12,28,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 16px 0 20px;
          flex-shrink: 0;
          position: relative;
          z-index: 20;
        }
        .banner-logo-responsive {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 8px;
        }
        .banner-quest-pill-responsive {
          flex: 1;
          max-width: 360px;
          height: 32px;
          background: linear-gradient(90deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05));
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
        }
        .banner-quest-text-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          white-space: nowrap;
        }
        .banner-quest-title-text {
          font-size: 11px;
          font-weight: 700;
          color: #f59e0b;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .banner-quest-subtitle {
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 0.05em;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        @media (max-width: 900px) {
          .top-banner-responsive {
            padding: 0 8px;
            gap: 6px;
          }
          .banner-logo-text {
            display: none;
          }
          .banner-logo-responsive {
            margin-right: 0;
          }
          .banner-quest-pill-responsive {
            padding: 0 8px;
            gap: 4px;
            max-width: 160px;
          }
          .banner-quest-subtitle {
            display: none;
          }
          .banner-quest-xp {
            display: none;
          }
          .banner-actions {
            gap: 4px;
            margin-left: auto;
          }
          .banner-avatar {
            flex-shrink: 0;
          }
          .banner-icon-btn {
            flex-shrink: 0;
          }
        }
      `}</style>
      
      <div className="top-banner-responsive">
        {/* Hamburger + Logo */}
        <button
          onClick={onMenuClick}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', marginRight: '4px',
          }}
        >
          <Menu size={18} />
        </button>

        <div className="banner-logo-responsive">
          <div className="banner-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L22 20 L2 20 Z" fill="white" opacity="0.9" />
              <path d="M12 6 L19 20 L5 20 Z" fill="rgba(0,212,255,0.4)" />
            </svg>
          </div>
          <span className="banner-logo-text">ASCENSION</span>
        </div>

        {/* Quest notification pill */}
        {!dismissed && (
          <div className="banner-quest-pill-responsive" onClick={() => setDismissed(true)}>
            <span className="banner-quest-icon">👑</span>
            <div className="banner-quest-text-col">
              <div className="banner-quest-title-text">
                {incompleteQuests > 0 ? `${incompleteQuests} Active Mission${incompleteQuests > 1 ? 's' : ''} Awaiting` : 'All Missions Complete!'}
              </div>
              <div className="banner-quest-subtitle">
                {latestLog || 'Tap to view mission board'}
              </div>
            </div>
            <span className="banner-quest-xp">
              {latestXp ? `+${latestXp} XP` : 'VIEW ALL'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: '4px' }}>›</span>
          </div>
        )}

        <div className="banner-actions">
				{/* Gold Badge */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						background: 'rgba(245, 158, 11, 0.1)',
						border: '1px solid rgba(245, 158, 11, 0.25)',
						borderRadius: '12px',
						padding: '2px 8px',
						color: '#f59e0b',
						fontFamily: "'Orbitron', sans-serif",
						fontSize: '11px',
						fontWeight: 700,
						marginRight: '8px',
						height: '24px'
					}}
				>
					<span>🪙</span>
					<span>{gold || 0} GLD</span>
				</div>
				<div className="banner-icon-btn">
            <Bell size={14} />
            {incompleteQuests > 0 && (
              <span className="banner-notif-badge">{Math.min(9, incompleteQuests)}</span>
            )}
          </div>
          <div className="banner-icon-btn">
            <Search size={14} />
          </div>
          <div className="banner-icon-btn" style={{ display: 'none' }}>
            <MessageCircle size={14} />
          </div>
          <div className="banner-avatar" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: '900', flexShrink: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3b82f6', borderRadius: '50%', color: 'white' }}>
            S
          </div>
        </div>
      </div>
    </>
  );
}
