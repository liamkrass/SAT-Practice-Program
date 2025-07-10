import React, { useState, useCallback } from 'react';
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

interface DiceGameProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

type RollCondition = 'under' | 'over';

interface GameState {
  betAmount: number;
  targetNumber: number;
  rollCondition: RollCondition;
  multiplier: number;
  winChance: number;
  lastRoll: number | null;
  gameStatus: 'waiting' | 'rolling' | 'win' | 'lose';
  rollHistory: Array<{ roll: number; won: boolean; target: number; condition: RollCondition; payout: number }>;
  isAutoPlay: boolean;
  autoPlayCount: number;
  currentAutoPlay: number;
}

const DiceGame: React.FC<DiceGameProps> = ({ onClose, balance, onEarn }) => {
  const [gameState, setGameState] = useState<GameState>({
    betAmount: roundMoney(1),
    targetNumber: 50,
    rollCondition: 'under',
    multiplier: 1.98,
    winChance: 50.50,
    lastRoll: null,
    gameStatus: 'waiting',
    rollHistory: [],
    isAutoPlay: false,
    autoPlayCount: 10,
    currentAutoPlay: 0,
  });

  const [betInput, setBetInput] = useState('1.00');
  const [targetInput, setTargetInput] = useState('50');
  const [autoPlayInput, setAutoPlayInput] = useState('10');

  const calculateMultiplier = useCallback((winChance: number) => {
    // House edge of 1%
    const houseEdge = 0.01;
    return (100 - houseEdge) / winChance;
  }, []);

  const calculateWinChance = useCallback((target: number, condition: RollCondition) => {
    if (condition === 'under') {
      return target - 0.0001; // Slightly less than target for "under"
    } else {
      return 100 - target; // Remaining percentage for "over"
    }
  }, []);

  const updateTarget = useCallback((value: string) => {
    setTargetInput(value);
    const target = parseFloat(value);
    if (!isNaN(target) && target >= 0.01 && target <= 99.99) {
      const winChance = calculateWinChance(target, gameState.rollCondition);
      const multiplier = calculateMultiplier(winChance);
      
      setGameState(prev => ({
        ...prev,
        targetNumber: target,
        winChance: winChance,
        multiplier: multiplier,
      }));
    }
  }, [gameState.rollCondition, calculateWinChance, calculateMultiplier]);

  const updateCondition = useCallback((condition: RollCondition) => {
    const winChance = calculateWinChance(gameState.targetNumber, condition);
    const multiplier = calculateMultiplier(winChance);
    
    setGameState(prev => ({
      ...prev,
      rollCondition: condition,
      winChance: winChance,
      multiplier: multiplier,
    }));
  }, [gameState.targetNumber, calculateWinChance, calculateMultiplier]);

  const updateBetAmount = useCallback((value: string) => {
    setBetInput(value);
    const amount = parseMoneyInput(value);
    if (isValidMoney(amount)) {
      setGameState(prev => ({ ...prev, betAmount: sanitizeMoney(amount) }));
    }
  }, []);

  const rollDice = useCallback(() => {
    if (balance < gameState.betAmount) return;
    
    setGameState(prev => ({ ...prev, gameStatus: 'rolling' }));
    
    // Deduct bet amount
    onEarn(-roundMoney(gameState.betAmount));
    
    // Simulate dice roll animation
    setTimeout(() => {
      // Generate random number between 0.00 and 99.99
      const roll = Math.random() * 100;
      const roundedRoll = Math.round(roll * 100) / 100;
      
      // Use current state values instead of stale closure values
      setGameState(prev => {
        // Check if player won using current state values
        const won = prev.rollCondition === 'under' 
          ? roundedRoll < prev.targetNumber 
          : roundedRoll > prev.targetNumber;
        
        const payout = won ? multiplyMoney(prev.betAmount, prev.multiplier) : 0;
        
        if (won) {
          onEarn(roundMoney(payout));
        }
        
        const newState: GameState = {
          ...prev,
          lastRoll: roundedRoll,
          gameStatus: (won ? 'win' : 'lose') as 'win' | 'lose',
          rollHistory: [
            {
              roll: roundedRoll,
              won,
              target: prev.targetNumber,
              condition: prev.rollCondition,
              payout: payout,
            },
            ...prev.rollHistory.slice(0, 9)
          ],
          currentAutoPlay: prev.isAutoPlay ? prev.currentAutoPlay + 1 : 0,
        };
        
        // Continue auto play if enabled and still have rolls left
        if (prev.isAutoPlay && prev.currentAutoPlay < prev.autoPlayCount - 1) {
          setTimeout(() => {
            rollDice();
          }, 1000);
        } else if (prev.isAutoPlay) {
          newState.isAutoPlay = false;
          newState.currentAutoPlay = 0;
        }
        
        return newState;
      });
    }, 1000);
  }, [balance, onEarn]);

  const startAutoPlay = useCallback(() => {
    const autoPlayCountNumber = parseInt(autoPlayInput) || 10;
    setGameState(prev => ({ 
      ...prev, 
      isAutoPlay: true, 
      currentAutoPlay: 0,
      autoPlayCount: autoPlayCountNumber,
    }));
    // Start the first roll after state is set
    setTimeout(() => rollDice(), 100);
  }, [autoPlayInput, rollDice]);

  const stopAutoPlay = useCallback(() => {
    setGameState(prev => ({ ...prev, isAutoPlay: false, currentAutoPlay: 0 }));
  }, []);

  const canPlay = gameState.gameStatus === 'waiting' && balance >= gameState.betAmount && !gameState.isAutoPlay;
  const canAutoPlay = gameState.gameStatus === 'waiting' && balance >= gameState.betAmount && !gameState.isAutoPlay;

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
        .dice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .dice-close-btn {
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
        
        .dice-close-btn:hover {
          background: rgba(94, 234, 212, 0.2);
          transform: translateY(-1px);
        }
        
        .dice-main-container {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .dice-controls-panel {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 16px;
          padding: 24px;
          height: fit-content;
        }
        
        .dice-game-area {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 16px;
          padding: 32px;
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        
        .condition-buttons {
          display: flex;
          gap: 8px;
          margin: 16px 0;
          justify-content: center;
        }
        
        .condition-btn {
          padding: 12px 24px;
          border: 1px solid #4b5563;
          border-radius: 12px;
          background: #374151;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          font-size: 16px;
        }
        
        .condition-btn.active {
          background: #059669;
          border-color: #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .condition-btn:hover {
          background: #4b5563;
          transform: translateY(-1px);
        }
        
        .condition-btn.active:hover {
          background: #047857;
        }
        
        .control-group {
          margin-bottom: 24px;
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
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 24px 0;
        }
        
        .stat-card {
          background: #1e293b;
          border: 1px solid #374151;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat-value {
          font-size: 1.25rem;
          font-weight: bold;
          color: #5eead4;
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
          width: 100%;
          margin-bottom: 12px;
        }
        
        .btn-roll {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
        }
        
        .btn-roll:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        
        .btn-auto {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
        }
        
        .btn-auto:hover:not(:disabled) {
          background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
        }
        
        .btn-stop {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
        }
        
        .btn-stop:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
        
        .btn-primary:disabled {
          background: #374151;
          color: #6b7280;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .dice-number {
          font-size: 4rem;
          font-weight: bold;
          margin: 16px 0;
          text-shadow: 0 0 20px currentColor;
          transition: all 0.3s ease;
        }
        
        .dice-rolling {
          animation: rollAnimation 1s infinite;
        }
        
        @keyframes rollAnimation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div className="dice-header">
        <h1 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dice icon */}
            <rect x="3" y="3" width="8" height="8" rx="2" fill="white" stroke="#374151"/>
            <circle cx="5" cy="5" r="0.5" fill="#1f2937"/>
            <circle cx="7" cy="7" r="0.5" fill="#1f2937"/>
            <circle cx="9" cy="9" r="0.5" fill="#1f2937"/>
            <rect x="13" y="13" width="8" height="8" rx="2" fill="white" stroke="#374151"/>
            <circle cx="15" cy="15" r="0.5" fill="#1f2937"/>
            <circle cx="17" cy="17" r="0.5" fill="#1f2937"/>
            <circle cx="19" cy="19" r="0.5" fill="#1f2937"/>
            <circle cx="15" cy="19" r="0.5" fill="#1f2937"/>
            <circle cx="19" cy="15" r="0.5" fill="#1f2937"/>
          </svg>
          Dice
        </h1>
        <button onClick={onClose} className="dice-close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="dice-main-container">
        {/* Left Controls Panel */}
        <div className="dice-controls-panel">
          <div className="control-group">
            <div className="control-label">Balance</div>
            <div style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#5eead4',
              textAlign: 'center',
              padding: '12px',
              background: 'rgba(94, 234, 212, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(94, 234, 212, 0.2)'
            }}>
              ${formatMoney(balance)}
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Bet Amount</div>
            <input
              type="text"
              value={betInput}
              onChange={(e) => updateBetAmount(e.target.value)}
              className="control-input"
              disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
              placeholder="1.00"
            />
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button 
                onClick={() => updateBetAmount((gameState.betAmount / 2).toFixed(2))}
                className="condition-btn"
                disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
                style={{ flex: 1, padding: '8px', fontSize: '12px' }}
              >
                ½
              </button>
              <button 
                onClick={() => updateBetAmount((gameState.betAmount * 2).toFixed(2))}
                className="condition-btn"
                disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
                style={{ flex: 1, padding: '8px', fontSize: '12px' }}
              >
                2×
              </button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Target Number</div>
            <input
              type="text"
              value={targetInput}
              onChange={(e) => updateTarget(e.target.value)}
              className="control-input"
              disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
              placeholder="50.00"
            />
          </div>

          <div className="control-group">
            <div className="control-label">Auto Play Rolls</div>
            <input
              type="number"
              value={autoPlayInput}
              onChange={(e) => setAutoPlayInput(e.target.value)}
              className="control-input"
              disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
              min="1"
              max="1000"
              placeholder="10"
            />
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Win Chance</div>
              <div className="stat-value">{gameState.winChance.toFixed(2)}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Multiplier</div>
              <div className="stat-value">{gameState.multiplier.toFixed(2)}x</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Payout</div>
              <div className="stat-value">${formatMoney(multiplyMoney(gameState.betAmount, gameState.multiplier))}</div>
            </div>
          </div>

          {/* Action Buttons */}
          {!gameState.isAutoPlay ? (
            <>
              <button
                onClick={rollDice}
                disabled={!canPlay}
                className="btn-primary btn-roll"
              >
                {gameState.gameStatus === 'rolling' ? 'Rolling...' : `Roll Dice - $${formatMoney(gameState.betAmount)}`}
              </button>
              
              <button
                onClick={startAutoPlay}
                disabled={!canAutoPlay}
                className="btn-primary btn-auto"
              >
                Auto Play ({autoPlayInput})
              </button>
            </>
          ) : (
            <button
              onClick={stopAutoPlay}
              className="btn-primary btn-stop"
            >
              Stop Auto Play
            </button>
          )}
        </div>

        {/* Right Game Area */}
        <div className="dice-game-area">
          {/* Roll Condition Buttons */}
          <div className="condition-buttons">
            <button
              className={`condition-btn ${gameState.rollCondition === 'under' ? 'active' : ''}`}
              onClick={() => updateCondition('under')}
              disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
            >
              Roll Under
            </button>
            <button
              className={`condition-btn ${gameState.rollCondition === 'over' ? 'active' : ''}`}
              onClick={() => updateCondition('over')}
              disabled={gameState.gameStatus === 'rolling' || gameState.isAutoPlay}
            >
              Roll Over
            </button>
          </div>

          {/* Dice Result Display */}
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              margin: '16px 0',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              justifyContent: 'center'
            }}>
              <span>Target: {gameState.rollCondition} {gameState.targetNumber.toFixed(2)}</span>
            </div>
            
            {gameState.lastRoll !== null && (
              <div 
                className={`dice-number ${gameState.gameStatus === 'rolling' ? 'dice-rolling' : ''}`}
                style={{ 
                  color: gameState.gameStatus === 'win' ? '#10b981' : 
                         gameState.gameStatus === 'lose' ? '#ef4444' : '#5eead4'
                }}
              >
                {gameState.gameStatus === 'rolling' ? '?' : gameState.lastRoll.toFixed(2)}
              </div>
            )}
            
            {gameState.lastRoll === null && (
              <div className="dice-number" style={{ color: '#5eead4' }}>
                🎲
              </div>
            )}
            
            {gameState.gameStatus === 'win' && (
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>
                You Win! +${formatMoney(multiplyMoney(gameState.betAmount, gameState.multiplier))}
              </div>
            )}
            
            {gameState.gameStatus === 'lose' && (
              <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>
                You Lose! -${formatMoney(gameState.betAmount)}
              </div>
            )}
            
            {gameState.isAutoPlay && (
              <div style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '1rem' }}>
                Auto Play: {gameState.currentAutoPlay + 1} / {gameState.autoPlayCount}
              </div>
            )}
          </div>

          {/* Roll History */}
          <div style={{ marginTop: '32px' }}>
            <div style={{
              ...applyTypography(typography.heading.sm),
              color: textColors.secondary,
              marginBottom: '12px',
              fontWeight: 700
            }}>
              Roll History
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              padding: '8px 0',
              minHeight: '48px',
            }}>
              {gameState.rollHistory.length === 0 && (
                <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>No rolls yet</span>
              )}
              {gameState.rollHistory.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: item.won ? '#065f46' : '#7f1d1d',
                    color: item.won ? '#10b981' : '#ef4444',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    minWidth: '80px',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    boxShadow: item.won ? '0 2px 8px #10b98133' : '0 2px 8px #ef444433',
                  }}
                  title={`Roll: ${item.roll.toFixed(2)}\n${item.condition === 'under' ? 'Under' : 'Over'} ${item.target.toFixed(2)}\n${item.won ? 'Win' : 'Lose'}\nPayout: $${formatMoney(item.payout)}`}
                >
                  <div>{item.roll.toFixed(2)}</div>
                  <div style={{ fontSize: '0.8em', opacity: 0.8 }}>{item.condition === 'under' ? 'Under' : 'Over'} {item.target.toFixed(2)}</div>
                  <div style={{ fontSize: '0.8em', fontWeight: 400 }}>{item.won ? `+${formatMoney(item.payout)}` : `-${formatMoney(item.payout || gameState.betAmount)}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DiceGame;
