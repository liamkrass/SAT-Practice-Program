import React, { useState, useEffect, useRef, useCallback } from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';
import { 
  formatMoney, 
  roundMoney, 
  addMoney, 
  subtractMoney, 
  multiplyMoney, 
  parseMoneyInput, 
  sanitizeMoney,
  isValidMoney 
} from '../utils/money';

interface CrashGameProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

interface GameState {
  betAmount: number;
  gameStatus: 'waiting' | 'running' | 'crashed' | 'won';
  currentMultiplier: number;
  crashPoint: number;
  cashedOut: boolean;
  cashOutAt: number | null;
  gameHistory: number[];
}

const CrashGame: React.FC<CrashGameProps> = ({ onClose, balance, onEarn }) => {
  const [gameState, setGameState] = useState<GameState>({
    betAmount: roundMoney(1),
    gameStatus: 'waiting',
    currentMultiplier: 1.0,
    crashPoint: 0,
    cashedOut: false,
    cashOutAt: null,
    gameHistory: [2.14, 1.06, 3.87, 1.42, 8.91, 1.13, 2.67, 1.89, 4.33, 1.24],
  });

  const [betInput, setBetInput] = useState('1.00');
  const [autoCashOutInput, setAutoCashOutInput] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameStartTimeRef = useRef<number>(0);

  // Generate crash point using provably fair algorithm (simplified)
  const generateCrashPoint = useCallback(() => {
    const random = Math.random();
    // Using crash game formula: 99 / (100 - random * 99)
    // This gives a realistic distribution similar to Stake
    const crashPoint = 99 / (100 - random * 99);
    return Math.max(1.0, Math.round(crashPoint * 100) / 100);
  }, []);

  const startNewGame = useCallback(() => {
    if (balance < gameState.betAmount) return;
    
    const newCrashPoint = generateCrashPoint();
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'running',
      currentMultiplier: 1.0,
      crashPoint: newCrashPoint,
      cashedOut: false,
      cashOutAt: null,
    }));

    // Deduct bet amount
    onEarn(-roundMoney(gameState.betAmount));
    
    gameStartTimeRef.current = Date.now();
    
    // Start the multiplier animation
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - gameStartTimeRef.current) / 1000;
      // Multiplier grows exponentially over time
      const multiplier = Math.pow(1.05, elapsed * 10);
      
      setGameState(prev => {
        if (prev.gameStatus !== 'running') return prev;
        
        if (multiplier >= prev.crashPoint) {
          // Game crashed
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          return {
            ...prev,
            currentMultiplier: prev.crashPoint,
            gameStatus: 'crashed',
            gameHistory: [prev.crashPoint, ...prev.gameHistory.slice(0, 9)],
          };
        }
        
        // Check auto cash out
        if (prev.cashOutAt && multiplier >= prev.cashOutAt && !prev.cashedOut) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          const winAmount = multiplyMoney(gameState.betAmount, prev.cashOutAt);
          onEarn(roundMoney(winAmount));
          
          return {
            ...prev,
            currentMultiplier: prev.cashOutAt,
            gameStatus: 'won',
            cashedOut: true,
            gameHistory: [prev.cashOutAt, ...prev.gameHistory.slice(0, 9)],
          };
        }
        
        return {
          ...prev,
          currentMultiplier: multiplier,
        };
      });
    }, 50);
  }, [balance, gameState.betAmount, generateCrashPoint, onEarn]);

  const cashOut = useCallback(() => {
    if (gameState.gameStatus !== 'running' || gameState.cashedOut) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const winAmount = multiplyMoney(gameState.betAmount, gameState.currentMultiplier);
    onEarn(roundMoney(winAmount));
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'won',
      cashedOut: true,
      gameHistory: [prev.currentMultiplier, ...prev.gameHistory.slice(0, 9)],
    }));
  }, [gameState.gameStatus, gameState.cashedOut, gameState.betAmount, gameState.currentMultiplier, onEarn]);

  const updateBetAmount = useCallback((value: string) => {
    setBetInput(value);
    const amount = parseMoneyInput(value);
    if (isValidMoney(amount)) {
      setGameState(prev => ({ ...prev, betAmount: sanitizeMoney(amount) }));
    }
  }, []);

  const updateAutoCashOut = useCallback((value: string) => {
    setAutoCashOutInput(value);
    if (value === '') {
      setGameState(prev => ({ ...prev, cashOutAt: null }));
    } else {
      const multiplier = parseFloat(value);
      if (!isNaN(multiplier) && multiplier >= 1.01) {
        setGameState(prev => ({ ...prev, cashOutAt: multiplier }));
      }
    }
  }, []);

  const resetGame = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'waiting',
      currentMultiplier: 1.0,
      crashPoint: 0,
      cashedOut: false,
      cashOutAt: null,
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getMultiplierColor = () => {
    if (gameState.gameStatus === 'crashed') return '#ef4444';
    if (gameState.gameStatus === 'won') return '#10b981';
    if (gameState.currentMultiplier >= 2) return '#f59e0b';
    return '#5eead4';
  };

  const isGameActive = gameState.gameStatus === 'running';
  const canBet = gameState.gameStatus === 'waiting' && balance >= gameState.betAmount;
  const canCashOut = gameState.gameStatus === 'running' && !gameState.cashedOut;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      overflow: 'auto',
      zIndex: 1000
    }}>
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderRadius: '20px',
          border: '2px solid #5eead4',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          width: '95vw',
          height: '95vh',
          maxWidth: '1400px',
          maxHeight: '900px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: '20px'
        }}
      >
      <style>{`
        .crash-game {
          /* Remove old positioning styles */
        }
        
        .crash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .crash-close-btn {
          background: rgba(94, 234, 212, 0.1);
          border: 1px solid rgba(94, 234, 212, 0.3);
          border-radius: 10px;
          color: #5eead4;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: bold;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .crash-close-btn:hover {
          background: rgba(94, 234, 212, 0.2);
          transform: translateY(-1px);
        }
        
        .crash-graph {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 2px solid #5eead4;
          border-radius: 16px;
          padding: 32px;
          margin: 24px 0;
          position: relative;
          overflow: hidden;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .crash-visual-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        
        .crash-multiplier {
          font-size: 4rem;
          font-weight: bold;
          text-align: center;
          text-shadow: 0 0 20px currentColor;
          transition: all 0.1s ease;
          z-index: 10;
          position: relative;
        }
        
        .crash-status {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 10;
        }
        
        .crash-visual-line {
          position: absolute;
          bottom: 60px;
          left: 40px;
          right: 40px;
          height: 120px;
          overflow: hidden;
        }
        
        .crash-curve-svg {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        
        .crash-curve-path {
          fill: none;
          stroke: url(#crashGradient);
          stroke-width: 4;
          filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6));
        }
        
        .crash-visual-progress {
          height: 100%;
          background: transparent;
          border-radius: 2px;
          transition: width 0.1s ease;
          position: relative;
        }
        
        .crash-visual-rocket {
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, #fbbf24 0%, #f59e0b 70%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          animation: rocketFly 0.3s ease-in-out infinite alternate;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
        }
        
        .crash-rocket-trail {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, #fbbf24 50%, #f59e0b 100%);
          border-radius: 2px;
          animation: trail 0.2s ease-in-out infinite;
        }
        
        @keyframes rocketFly {
          0% { 
            transform: translateY(-50%) scale(1) rotate(-5deg);
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
          }
          100% { 
            transform: translateY(-50%) scale(1.15) rotate(5deg);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
          }
        }
        
        @keyframes trail {
          0% { opacity: 0.6; width: 20px; }
          100% { opacity: 1; width: 35px; }
        }
        
        @keyframes rocketPulse {
          0% { transform: translateY(-50%) scale(1); }
          100% { transform: translateY(-50%) scale(1.1); }
        }
        
        .crash-explosion {
          position: absolute;
          right: -30px;
          top: 50%;
          transform: translateY(-50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, #fbbf24 0%, #ef4444 30%, #dc2626 60%, transparent 80%);
          border-radius: 50%;
          animation: explosion 0.6s ease-out infinite;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @keyframes explosion {
          0% { 
            transform: translateY(-50%) scale(0.5);
            opacity: 1;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
          }
          50% {
            transform: translateY(-50%) scale(1.2);
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
          }
          100% { 
            transform: translateY(-50%) scale(2);
            opacity: 0;
            box-shadow: 0 0 60px rgba(239, 68, 68, 0.2);
          }
        }
        
        .status-waiting {
          background: #374151;
          color: #9ca3af;
        }
        
        .status-running {
          background: #065f46;
          color: #10b981;
          animation: pulse 2s infinite;
        }
        
        .status-crashed {
          background: #7f1d1d;
          color: #ef4444;
        }
        
        .status-won {
          background: #064e3b;
          color: #10b981;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .crash-history {
          display: flex;
          gap: 8px;
          margin: 16px 0;
          overflow-x: auto;
          padding: 8px;
        }
        
        .history-item {
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 0.875rem;
          min-width: 60px;
          text-align: center;
          white-space: nowrap;
        }
        
        .history-green {
          background: #065f46;
          color: #10b981;
        }
        
        .history-red {
          background: #7f1d1d;
          color: #ef4444;
        }
        
        .controls-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        
        .control-group {
          background: #1e293b;
          border: 1px solid #374151;
          border-radius: 12px;
          padding: 16px;
        }
        
        .control-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .control-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #4b5563;
          border-radius: 8px;
          background: #374151;
          color: white;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .control-input:focus {
          outline: none;
          border-color: #5eead4;
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.1);
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        
        .btn-primary {
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .btn-bet {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
        }
        
        .btn-bet:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        
        .btn-bet:disabled {
          background: #374151;
          color: #6b7280;
          cursor: not-allowed;
        }
        
        .btn-cashout {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }
        
        .btn-cashout:hover:not(:disabled) {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }
        
        .btn-cashout:disabled {
          background: #374151;
          color: #6b7280;
          cursor: not-allowed;
        }
      `}</style>

      {/* Header */}
      <div className="crash-header">
        <h1 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rocket icon */}
            <path d="M12 2L13 8L19 9L13 10L12 16L11 10L5 9L11 8L12 2Z" fill="#fbbf24"/>
            <circle cx="12" cy="20" r="2" fill="#ef4444"/>
          </svg>
          Crash
        </h1>
        <button onClick={onClose} className="crash-close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      {/* Game Graph */}
      <div className="crash-graph">
        <div className="crash-visual-container">
          <div className="crash-visual-line">
            <svg className="crash-curve-svg" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="crashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <path
                className="crash-curve-path"
                d={`M 0 120 Q ${Math.min(400, (gameState.currentMultiplier - 1) * 40)} ${Math.max(20, 120 - (gameState.currentMultiplier - 1) * 15)} ${Math.min(400, (gameState.currentMultiplier - 1) * 40)} ${Math.max(20, 120 - (gameState.currentMultiplier - 1) * 15)}`}
                strokeDasharray={`${Math.min(400, (gameState.currentMultiplier - 1) * 40)} 400`}
                strokeDashoffset={400 - Math.min(400, (gameState.currentMultiplier - 1) * 40)}
              />
              {gameState.gameStatus === 'running' && !gameState.cashedOut && (
                <g>
                  <circle
                    cx={Math.min(390, (gameState.currentMultiplier - 1) * 40)}
                    cy={Math.max(30, 120 - (gameState.currentMultiplier - 1) * 15)}
                    r="8"
                    fill="#fbbf24"
                    filter="drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))"
                  >
                    <animate attributeName="r" values="6;10;6" dur="0.5s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x={Math.min(390, (gameState.currentMultiplier - 1) * 40)}
                    y={Math.max(25, 115 - (gameState.currentMultiplier - 1) * 15)}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#fbbf24"
                  >
                    🚀
                  </text>
                </g>
              )}
              {gameState.gameStatus === 'crashed' && (
                <g>
                  <circle
                    cx={Math.min(390, (gameState.currentMultiplier - 1) * 40)}
                    cy={Math.max(30, 120 - (gameState.currentMultiplier - 1) * 15)}
                    r="15"
                    fill="#ef4444"
                    opacity="0.8"
                  >
                    <animate attributeName="r" values="8;20;8" dur="0.6s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x={Math.min(390, (gameState.currentMultiplier - 1) * 40)}
                    y={Math.max(35, 125 - (gameState.currentMultiplier - 1) * 15)}
                    textAnchor="middle"
                    fontSize="16"
                    fill="#fff"
                  >
                    💥
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
        
        <div 
          className={`crash-status ${
            gameState.gameStatus === 'waiting' ? 'status-waiting' :
            gameState.gameStatus === 'running' ? 'status-running' :
            gameState.gameStatus === 'crashed' ? 'status-crashed' :
            'status-won'
          }`}
        >
          {gameState.gameStatus === 'waiting' && 'Waiting for next round'}
          {gameState.gameStatus === 'running' && 'Flying...'}
          {gameState.gameStatus === 'crashed' && 'Crashed!'}
          {gameState.gameStatus === 'won' && 'Cashed Out!'}
        </div>
        
        <div 
          className="crash-multiplier"
          style={{ color: getMultiplierColor() }}
        >
          {gameState.currentMultiplier.toFixed(2)}x
        </div>
      </div>

      {/* Game History */}
      <div className="crash-history">
        {gameState.gameHistory.map((multiplier, index) => (
          <div 
            key={index}
            className={`history-item ${multiplier >= 2 ? 'history-green' : 'history-red'}`}
          >
            {multiplier.toFixed(2)}x
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls-grid">
        <div className="control-group">
          <div className="control-label">Bet Amount</div>
          <input
            type="text"
            value={betInput}
            onChange={(e) => updateBetAmount(e.target.value)}
            className="control-input"
            disabled={isGameActive}
            placeholder="1.00"
          />
        </div>
        
        <div className="control-group">
          <div className="control-label">Auto Cash Out (Optional)</div>
          <input
            type="text"
            value={autoCashOutInput}
            onChange={(e) => updateAutoCashOut(e.target.value)}
            className="control-input"
            disabled={isGameActive}
            placeholder="2.00"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {(gameState.gameStatus === 'crashed' || gameState.gameStatus === 'won') ? (
          <button
            onClick={resetGame}
            className="btn-primary btn-bet"
          >
            New Game
          </button>
        ) : (
          <button
            onClick={startNewGame}
            disabled={!canBet}
            className="btn-primary btn-bet"
          >
            {gameState.gameStatus === 'waiting' ? `Bet $${formatMoney(gameState.betAmount)}` : 'Place Bet'}
          </button>
        )}
        
        <button
          onClick={cashOut}
          disabled={!canCashOut}
          className="btn-primary btn-cashout"
        >
          Cash Out ${formatMoney(multiplyMoney(gameState.betAmount, gameState.currentMultiplier))}
        </button>
      </div>

      {/* Game Info */}
      <div className="game-info">
        <p style={{ ...applyTypography(typography.body.sm), color: textColors.secondary }}>
          💥 Watch the multiplier rise and cash out before it crashes! The longer you wait, the higher the potential payout.
        </p>
      </div>
      </div>
    </div>
  );
};

export default CrashGame;