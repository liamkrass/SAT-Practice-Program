import React, { useState, useCallback, useEffect } from 'react';
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
import { getSavedBalance, saveBalance } from '../utils/balanceStorage';

interface RouletteGameProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

interface Bet {
  type: string;
  numbers: number[];
  amount: number;
  payout: number;
}

interface GameState {
  bets: Bet[];
  totalBet: number;
  winningNumber: number | null;
  isSpinning: boolean;
  gameStatus: 'betting' | 'spinning' | 'finished';
  result: string;
  betAmount: number;
  wheelRotation: number;
}

const MIN_BET = 0.01;

const RouletteGame: React.FC<RouletteGameProps> = ({ onClose, balance, onEarn }) => {
  const [gameState, setGameState] = useState<GameState>({
    bets: [],
    totalBet: 0,
    winningNumber: null,
    isSpinning: false,
    gameStatus: 'betting',
    result: '',
    betAmount: roundMoney(1),
    wheelRotation: 0,
  });

  // European roulette numbers and their colors
  const rouletteNumbers = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
    { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
    { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
    { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
    { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
    { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
    { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
    { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
    { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
    { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
    { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
    { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
  ];

  const getNumberColor = (num: number): string => {
    if (num === 0) return 'green';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  const placeBet = useCallback((betType: string, numbers: number[], payout: number) => {
    if (gameState.gameStatus !== 'betting' || balance < gameState.betAmount) return;

    const newBet: Bet = {
      type: betType,
      numbers,
      amount: roundMoney(gameState.betAmount),
      payout,
    };

    setGameState(prev => ({
      ...prev,
      bets: [...prev.bets, newBet],
      totalBet: roundMoney(addMoney(prev.totalBet, gameState.betAmount)),
    }));

    onEarn(roundMoney(-gameState.betAmount));
  }, [gameState.gameStatus, gameState.betAmount, balance, onEarn]);

  const clearBets = useCallback(() => {
    onEarn(roundMoney(gameState.totalBet)); // Return all bet money
    setGameState(prev => ({
      ...prev,
      bets: [],
      totalBet: 0,
    }));
  }, [gameState.totalBet, onEarn]);

  const spin = useCallback(() => {
    if (gameState.bets.length === 0 || gameState.gameStatus !== 'betting') return;

    const winningNumber = Math.floor(Math.random() * 37); // 0-36
    const spinRotation = 360 * 5 + (winningNumber * (360 / 37)); // 5 full rotations plus position

    setGameState(prev => ({
      ...prev,
      gameStatus: 'spinning',
      isSpinning: true,
      winningNumber,
      wheelRotation: prev.wheelRotation + spinRotation,
    }));

    // Simulate spin duration
    setTimeout(() => {
      setGameState(prev => {
        const winnings = prev.bets.reduce((total, bet) => {
          if (bet.numbers.includes(winningNumber)) {
            return addMoney(total, multiplyMoney(bet.amount, bet.payout));
          }
          return total;
        }, 0);

        if (winnings > 0) {
          onEarn(roundMoney(winnings));
        }

        const result = winnings > 0 
          ? `Winner! Number ${winningNumber} (${getNumberColor(winningNumber)}). Won ${formatMoney(winnings)}`
          : `Number ${winningNumber} (${getNumberColor(winningNumber)}). Better luck next time!`;

        return {
          ...prev,
          gameStatus: 'finished',
          isSpinning: false,
          result,
        };
      });
    }, 3000);
  }, [gameState.bets, gameState.gameStatus, onEarn]);

  const newGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      bets: [],
      totalBet: 0,
      winningNumber: null,
      gameStatus: 'betting',
      result: '',
    }));
  }, []);

  // Generate straight number bets (0-36)
  const renderNumberGrid = () => {
    const numbers = [];
    
    // 0 (green)
    numbers.push(
      <button
        key={0}
        className="roulette-number green"
        onClick={() => placeBet('Straight', [0], 35)}
        disabled={gameState.gameStatus !== 'betting'}
      >
        0
      </button>
    );

    // Numbers 1-36 in roulette table layout
    for (let i = 1; i <= 36; i++) {
      const color = getNumberColor(i);
      numbers.push(
        <button
          key={i}
          className={`roulette-number ${color}`}
          onClick={() => placeBet('Straight', [i], 35)}
          disabled={gameState.gameStatus !== 'betting'}
        >
          {i}
        </button>
      );
    }

    return numbers;
  };

  useEffect(() => {
    saveBalance(balance);
  }, [balance]);

  return (
    <div className="roulette-game">
      {/* Header */}
      <div className="roulette-header">
        <h1 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Keep the Original Roulette Wheel (as requested) */}
            <circle cx="12" cy="12" r="10" fill="#1e293b" stroke="#5eead4" strokeWidth="1"/>
            <circle cx="12" cy="12" r="7" fill="#374151"/>
            {Array.from({length: 8}, (_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 12 + 5 * Math.cos(angle);
              const y1 = 12 + 5 * Math.sin(angle);
              const x2 = 12 + 7 * Math.cos(angle);
              const y2 = 12 + 7 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5eead4" strokeWidth="0.5"/>
              );
            })}
            <circle cx="12" cy="12" r="2" fill="#fbbf24"/>
            <circle cx="16" cy="8" r="1" fill="white"/>
          </svg>
          Roulette
        </h1>
        <button onClick={onClose} className="roulette-close-btn">←</button>
      </div>

      <div className="roulette-content">
        {/* Controls */}
        <div className="roulette-controls">
          <div className="roulette-balance">
            <span style={{ color: '#5eead4', fontWeight: 'bold' }}>
              Balance: {formatMoney(balance)}
            </span>
          </div>

          <div className="roulette-bet-section">
            <label>Bet Amount</label>
            <div className="roulette-bet-controls">
              <button onClick={() => setGameState(prev => ({ ...prev, betAmount: roundMoney(Math.max(MIN_BET, subtractMoney(prev.betAmount, 1))) }))}>
                -$1
              </button>
              <input
                type="number"
                value={gameState.betAmount}
                onChange={e => {
                  const raw = parseMoneyInput(e.target.value);
                  let clamped = Math.max(MIN_BET, Math.min(sanitizeMoney(raw), roundMoney(balance)));
                  setGameState(prev => ({ ...prev, betAmount: clamped }));
                }}
                min={MIN_BET}
                step="0.01"
                style={{ width: 80, textAlign: 'center', margin: '0 8px' }}
              />
              <button onClick={() => setGameState(prev => ({ ...prev, betAmount: Math.max(MIN_BET, Math.min(roundMoney(addMoney(prev.betAmount, 1)), roundMoney(balance))) }))}>
                +$1
              </button>
            </div>
            <div className="roulette-bet-controls" style={{ marginTop: '10px' }}>
              <button 
                onClick={() => setGameState(prev => ({ ...prev, betAmount: Math.max(MIN_BET, roundMoney(balance)) }))}
                disabled={balance < MIN_BET}
                className="all-in-btn"
              >
                All In ({formatMoney(balance)})
              </button>
            </div>
          </div>

          <div className="roulette-total-bet">
            <span>Total Bet: {formatMoney(gameState.totalBet)}</span>
          </div>

          <div className="roulette-actions">
            {gameState.gameStatus === 'betting' && (
              <>
                <button
                  onClick={spin}
                  disabled={gameState.bets.length === 0}
                  className="roulette-spin-btn"
                >
                  Spin!
                </button>
                <button
                  onClick={clearBets}
                  disabled={gameState.bets.length === 0}
                  className="roulette-clear-btn"
                >
                  Clear Bets
                </button>
              </>
            )}

            {gameState.gameStatus === 'finished' && (
              <button onClick={newGame} className="roulette-new-game-btn">
                New Game
              </button>
            )}
          </div>
        </div>

        {/* Roulette Wheel */}
        <div className="roulette-wheel-container">
          <div className="roulette-wheel" style={{ transform: `rotate(${gameState.wheelRotation}deg)` }}>
            {/* Wheel segments background */}
            <svg width="100%" height="100%" viewBox="0 0 300 300" className="wheel-segments">
              {rouletteNumbers.map((item, index) => {
                const startAngle = (index * (360 / 37)) - (360 / 37 / 2);
                const endAngle = startAngle + (360 / 37);
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const x1 = 150 + 120 * Math.cos(startRad);
                const y1 = 150 + 120 * Math.sin(startRad);
                const x2 = 150 + 120 * Math.cos(endRad);
                const y2 = 150 + 120 * Math.sin(endRad);
                
                const segmentColor = item.color === 'red' ? '#dc2626' : 
                                   item.color === 'black' ? '#1f2937' : '#059669';
                
                return (
                  <path
                    key={`segment-${item.number}`}
                    d={`M 150 150 L ${x1} ${y1} A 120 120 0 0 1 ${x2} ${y2} Z`}
                    fill={segmentColor}
                    stroke="#5eead4"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Inner circle */}
              <circle cx="150" cy="150" r="30" fill="#1e293b" stroke="#5eead4" strokeWidth="2"/>
            </svg>
            
            {/* Numbers positioned on segments */}
            {rouletteNumbers.map((item, index) => {
              const angle = (index * (360 / 37));
              const radius = 90; // Distance from center
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={item.number}
                  className={`wheel-number ${item.color}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {item.number}
                </div>
              );
            })}
          </div>
          <div className="wheel-pointer"></div>
          
          {gameState.winningNumber !== null && !gameState.isSpinning && (
            <div className="winning-number">
              <span className={getNumberColor(gameState.winningNumber)}>
                {gameState.winningNumber}
              </span>
            </div>
          )}
        </div>

        {/* Betting Table */}
        <div className="roulette-table">
          {/* Outside Bets */}
          <div className="outside-bets">
            <button
              className="outside-bet red"
              onClick={() => placeBet('Red', [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36], 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              Red (2:1)
            </button>
            <button
              className="outside-bet black"
              onClick={() => placeBet('Black', [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35], 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              Black (2:1)
            </button>
            <button
              className="outside-bet"
              onClick={() => placeBet('Even', [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36], 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              Even (2:1)
            </button>
            <button
              className="outside-bet"
              onClick={() => placeBet('Odd', [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35], 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              Odd (2:1)
            </button>
            <button
              className="outside-bet"
              onClick={() => placeBet('1-18', Array.from({length: 18}, (_, i) => i + 1), 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              1-18 (2:1)
            </button>
            <button
              className="outside-bet"
              onClick={() => placeBet('19-36', Array.from({length: 18}, (_, i) => i + 19), 2)}
              disabled={gameState.gameStatus !== 'betting'}
            >
              19-36 (2:1)
            </button>
          </div>

          {/* Number Grid */}
          <div className="roulette-number-grid">
            {renderNumberGrid()}
          </div>
        </div>

        {/* Result */}
        {gameState.result && (
          <div className="roulette-result">
            <h3 style={{ 
              color: gameState.result.includes('Winner') ? '#10b981' : '#dc2626'
            }}>
              {gameState.result}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouletteGame;
