import React from 'react';
import { Home, Sword, Swords, MapPin, Shield, FileText, Triangle } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS_LEFT = [
  { id: 'home', label: 'HOME', icon: <Home className="nav-icon-svg" /> },
  { id: 'equipment', label: 'EQUIPMENT', icon: <Sword className="nav-icon-svg" /> },
  { id: 'skills', label: 'SKILLS', icon: <Swords className="nav-icon-svg" /> },
];

const NAV_ITEMS_RIGHT = [
  { id: 'map', label: 'MAP', icon: <MapPin className="nav-icon-svg" /> },
  { id: 'guild', label: 'GUILD', icon: <Shield className="nav-icon-svg" /> },
  { id: 'missions', label: 'MISSIONS', icon: <FileText className="nav-icon-svg" /> },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const renderItem = (item: any) => {
    const isActive = activeTab === item.id;
    return (
      <button
        key={item.id}
        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
        onClick={() => onTabChange(item.id)}
      >
        <div className="bottom-nav-icon-wrapper">
          {item.icon}
        </div>
        <span className="bottom-nav-label">
          {item.label}
        </span>
        <div className="bottom-nav-indicator" />
      </button>
    );
  };

  return (
    <>
      <style>{`
        .bottom-nav-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(8, 11, 25, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 40px;
          padding: 0 30px;
          height: 70px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 2px 20px rgba(168,85,247,0.1);
          z-index: 100;
          width: max-content;
        }
        .bottom-nav-group {
          display: flex;
          gap: 30px;
        }
        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: all 0.2s;
          width: 60px;
        }
        .bottom-nav-item.active {
          color: #a855f7;
        }
        .bottom-nav-icon-wrapper {
          transition: all 0.2s;
        }
        .bottom-nav-item.active .bottom-nav-icon-wrapper {
          filter: drop-shadow(0 0 8px #a855f7);
        }
        .nav-icon-svg {
          width: 22px;
          height: 22px;
        }
        .bottom-nav-label {
          font-size: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .bottom-nav-indicator {
          width: 24px;
          height: 2px;
          background: transparent;
          margin-top: 2px;
          border-radius: 1px;
          transition: all 0.2s;
        }
        .bottom-nav-item.active .bottom-nav-indicator {
          background: #a855f7;
          box-shadow: 0 0 10px #a855f7;
        }
        .center-btn-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
        }
        .center-btn {
          position: absolute;
          top: -40px;
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(0, 100, 255, 0.4));
          border: 2px solid #00e5ff;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.6), inset 0 0 20px rgba(0, 229, 255, 0.4);
          transform: rotate(45deg);
          transition: all 0.2s;
          z-index: 2;
        }
        .center-btn-icon {
          transform: rotate(-45deg);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .center-btn-glow {
          position: absolute;
          top: -40px;
          width: 90px;
          height: 90px;
          background: rgba(0, 229, 255, 0.3);
          filter: blur(20px);
          border-radius: 50%;
          z-index: 1;
        }

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .bottom-nav-container {
            width: 95%;
            padding: 0 10px;
            gap: 10px;
            height: 60px;
            border-radius: 30px;
            bottom: 10px;
          }
          .bottom-nav-group {
            gap: 5px;
            flex: 1;
            justify-content: space-around;
          }
          .bottom-nav-item {
            width: 45px;
            gap: 4px;
          }
          .nav-icon-svg {
            width: 18px;
            height: 18px;
          }
          .bottom-nav-label {
            font-size: 8px;
            letter-spacing: 0;
          }
          .bottom-nav-indicator {
            width: 16px;
          }
          .center-btn-wrapper {
            width: 60px;
          }
          .center-btn {
            width: 50px;
            height: 50px;
            top: -25px;
            border-radius: 12px;
          }
          .center-btn-glow {
            width: 70px;
            height: 70px;
            top: -25px;
          }
        }
      `}</style>
      <div className="bottom-nav-container">
        
        {/* Left Items */}
        <div className="bottom-nav-group">
          {NAV_ITEMS_LEFT.map(renderItem)}
        </div>

        {/* Center Action Button */}
        <div className="center-btn-wrapper">
          <button onClick={() => onTabChange('ascension')} className="center-btn">
            <div className="center-btn-icon">
              <Triangle size={24} color="#fff" fill="#fff" style={{ filter: 'drop-shadow(0 0 10px #fff)' }} />
            </div>
          </button>
          <div className="center-btn-glow" />
        </div>

        {/* Right Items */}
        <div className="bottom-nav-group">
          {NAV_ITEMS_RIGHT.map(renderItem)}
        </div>

      </div>
    </>
  );
}
