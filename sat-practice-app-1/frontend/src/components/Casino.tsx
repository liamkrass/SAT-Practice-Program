import React, { useState } from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';
import { formatMoney } from '../utils/money';
import PlinkoGame from './PlinkoGame';
import MinesGame from './MinesGame';
import BlackjackGame from './BlackjackGame';
import RouletteGame from './RouletteGame';
import CrashGame from './CrashGame';
import DiceGame from './DiceGame';

interface CasinoProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

type GameType = 'lobby' | 'plinko' | 'mines' | 'blackjack' | 'roulette' | 'crash' | 'dice';

const Casino: React.FC<CasinoProps> = ({ onClose, balance, onEarn }) => {
  const [currentGame, setCurrentGame] = useState<GameType>('lobby');

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'plinko':
        return (
          <PlinkoGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      case 'mines':
        return (
          <MinesGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      case 'blackjack':
        return (
          <BlackjackGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      case 'roulette':
        return (
          <RouletteGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      case 'crash':
        return (
          <CrashGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      case 'dice':
        return (
          <DiceGame
            onClose={() => setCurrentGame('lobby')}
            balance={balance}
            onEarn={onEarn}
          />
        );
      default:
        return renderCasinoLobby();
    }
  };

  const renderCasinoLobby = () => (
    <div className="casino-lobby">
      {/* Header */}
      <div className="casino-header">
        <div className="casino-title">
          <div className="casino-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Elegant Casino Building */}
              <rect x="3" y="8" width="18" height="12" rx="2" fill="#5eead4" stroke="#2dd4bf" strokeWidth="1"/>
              <rect x="5" y="6" width="14" height="2" rx="1" fill="#fbbf24"/>
              <rect x="6" y="4" width="12" height="2" rx="1" fill="#f59e0b"/>
              
              {/* Windows/Lights */}
              <rect x="6" y="10" width="2" height="2" rx="0.5" fill="#fbbf24"/>
              <rect x="10" y="10" width="2" height="2" rx="0.5" fill="#fbbf24"/>
              <rect x="14" y="10" width="2" height="2" rx="0.5" fill="#fbbf24"/>
              
              {/* Main Entrance */}
              <rect x="10" y="14" width="4" height="6" rx="2" fill="#374151"/>
              <circle cx="12" cy="17" r="0.5" fill="#fbbf24"/>
              
              {/* Stars/Sparkles */}
              <path d="M7 3L7.5 4L8 3L7.5 2Z" fill="#fbbf24"/>
              <path d="M16 3L16.5 4L17 3L16.5 2Z" fill="#fbbf24"/>
              <circle cx="4" cy="5" r="0.5" fill="#fbbf24"/>
              <circle cx="20" cy="5" r="0.5" fill="#fbbf24"/>
            </svg>
          </div>
          <h1 style={{ ...applyTypography(typography.display.lg), color: textColors.primary, margin: 0 }}>
            SAT Casino
          </h1>
        </div>
        <div className="casino-balance">
          <span style={{ ...applyTypography(typography.heading.md), color: '#0f172a' }}>
            Balance: ${formatMoney(balance)}
          </span>
        </div>
        <button onClick={onClose} className="casino-close-btn">×</button>
      </div>

      {/* Game Grid */}
      <div className="casino-games-grid">
        <div className="game-card" onClick={() => setCurrentGame('plinko')}>
          <div className="game-icon">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              {/* Modern Plinko Board */}
              <rect x="15" y="10" width="70" height="80" rx="8" fill="#1e293b" stroke="#5eead4" strokeWidth="2"/>
              {/* Smaller Triangle Pegs Pattern (centered, more compact) */}
              {(() => {
                const rows = 7;
                const pegs = [];
                for (let row = 0; row < rows; row++) {
                  const pegCount = row + 1;
                  const y = 30 + row * 7.2;
                  const startX = 50 - (pegCount - 1) * 3.7;
                  for (let i = 0; i < pegCount; i++) {
                    pegs.push(
                      <circle
                        key={`peg-${row}-${i}`}
                        cx={startX + i * 7.4}
                        cy={y}
                        r="1.4"
                        fill="#5eead4"
                        stroke="#2dd4bf"
                        strokeWidth="0.5"
                      />
                    );
                  }
                }
                return pegs;
              })()}
              {/* Glowing Ball */}
              <circle cx="50" cy="15" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1">
                <animate attributeName="cy" values="15;25;15" dur="2s" repeatCount="indefinite"/>
              </circle>
              {/* Prize Slots */}
              <rect x="20" y="75" width="60" height="12" rx="3" fill="none" stroke="#5eead4" strokeWidth="1"/>
              <rect x="25" y="78" width="8" height="6" rx="1" fill="#ef4444"/>
              <rect x="36" y="78" width="8" height="6" rx="1" fill="#fbbf24"/>
              <rect x="47" y="78" width="8" height="6" rx="1" fill="#10b981"/>
              <rect x="58" y="78" width="8" height="6" rx="1" fill="#fbbf24"/>
              <rect x="69" y="78" width="8" height="6" rx="1" fill="#ef4444"/>
            </svg>
          </div>
          <h3>Plinko</h3>
          <p>Drop balls through pegs for multiplier rewards</p>
        </div>

        <div className="game-card" onClick={() => setCurrentGame('mines')}>
          <div className="game-icon">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              {/* Modern Mines Game Board */}
              <rect x="15" y="15" width="70" height="70" rx="8" fill="#1e293b" stroke="#5eead4" strokeWidth="2"/>
              
              {/* Grid Pattern */}
              {[0,1,2,3,4].map(row =>
                [0,1,2,3,4].map(col => (
                  <rect
                    key={`${row}-${col}`}
                    x={20 + col * 12}
                    y={20 + row * 12}
                    width="10"
                    height="10"
                    rx="2"
                    fill="#374151"
                    stroke="#4b5563"
                    strokeWidth="0.5"
                  />
                ))
              )}
              
              {/* Hidden Mine (danger indicator) */}
              <rect x="32" y="32" width="10" height="10" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
              <circle cx="37" cy="37" r="2" fill="#991b1b"/>
              <circle cx="37" cy="37" r="1" fill="#7c2d12"/>
              
              {/* Revealed Gem (success indicator) */}
              <rect x="56" y="44" width="10" height="10" rx="2" fill="#10b981" stroke="#059669" strokeWidth="1"/>
              <polygon points="61,47 63,50 61,53 59,50" fill="#047857"/>
              <polygon points="59,49 61,46 63,49 61,52" fill="#059669"/>
              
              {/* Sparkle Effects */}
              <circle cx="25" cy="25" r="1" fill="#fbbf24" opacity="0.8"/>
              <circle cx="75" cy="30" r="1" fill="#fbbf24" opacity="0.8"/>
              <circle cx="30" cy="75" r="1" fill="#fbbf24" opacity="0.8"/>
            </svg>
          </div>
          <h3>Mines</h3>
          <p>Find gems while avoiding hidden mines</p>
        </div>

        <div className="game-card" onClick={() => setCurrentGame('blackjack')}>
          <div className="game-icon">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              {/* Elegant Blackjack Table */}
              <ellipse cx="50" cy="55" rx="42" ry="32" fill="#059669" stroke="#047857" strokeWidth="2"/>
              <ellipse cx="50" cy="55" rx="35" ry="25" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5"/>
              
              {/* Premium Playing Cards */}
              <g>
                {/* Card 1 - Ace */}
                <rect x="25" y="35" width="14" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="1"/>
                <text x="32" y="46" fontSize="8" fill="#dc2626" textAnchor="middle" fontWeight="bold">A</text>
                <path d="M30 40L32 38L34 40" fill="#dc2626" opacity="0.6"/>
                
                {/* Card 2 - King */}
                <rect x="43" y="32" width="14" height="18" rx="2" fill="white" stroke="#374151" strokeWidth="1"/>
                <text x="50" y="43" fontSize="8" fill="#1f2937" textAnchor="middle" fontWeight="bold">K</text>
                <rect x="47" y="37" width="6" height="4" rx="1" fill="#1f2937" opacity="0.3"/>
                
                {/* Card 3 - Hidden */}
                <rect x="61" y="35" width="14" height="18" rx="2" fill="#4f46e5" stroke="#374151" strokeWidth="1"/>
                <rect x="64" y="38" width="8" height="12" rx="1" fill="#6366f1" opacity="0.8"/>
                <circle cx="68" cy="44" r="1.5" fill="white" opacity="0.9"/>
              </g>
              
              {/* Casino Chips */}
              <circle cx="30" cy="70" r="6" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
              <circle cx="30" cy="70" r="3" fill="white" opacity="0.8"/>
              
              <circle cx="45" cy="72" r="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1"/>
              <circle cx="45" cy="72" r="3" fill="white" opacity="0.8"/>
              
              <circle cx="60" cy="70" r="6" fill="#059669" stroke="#047857" strokeWidth="1"/>
              <circle cx="60" cy="70" r="3" fill="white" opacity="0.8"/>
              
              {/* Subtle Glow Effect */}
              <ellipse cx="50" cy="55" rx="40" ry="30" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3"/>
            </svg>
          </div>
          <h3>Blackjack</h3>
          <p>Beat the dealer without going over 21</p>
        </div>

        <div className="game-card" onClick={() => setCurrentGame('roulette')}>
          <div className="game-icon">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              {/* Wheel */}
              <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#5eead4" strokeWidth="2"/>
              <circle cx="50" cy="50" r="30" fill="#374151"/>
              {/* Wheel sections */}
              {Array.from({length: 8}, (_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const x1 = 50 + 20 * Math.cos(angle);
                const y1 = 50 + 20 * Math.sin(angle);
                const x2 = 50 + 30 * Math.cos(angle);
                const y2 = 50 + 30 * Math.sin(angle);
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5eead4" strokeWidth="1"/>
                );
              })}
              {/* Center */}
              <circle cx="50" cy="50" r="5" fill="#fbbf24"/>
              {/* Ball */}
              <circle cx="65" cy="35" r="2" fill="white"/>
            </svg>
          </div>
          <h3>Roulette</h3>
          <p>Bet on numbers, colors, or combinations</p>
        </div>
      </div>

      {/* Footer */}
      <div className="casino-footer">
        <p style={{ ...applyTypography(typography.body.md), color: textColors.secondary }}>
          🎓 Earn money by answering SAT questions correctly • Each correct answer = $100
        </p>
      </div>
    </div>
  );

  return (
    <div className="casino-overlay">
      <div className="casino-container">
        {renderCurrentGame()}
      </div>
    </div>
  );
};

export default Casino;
