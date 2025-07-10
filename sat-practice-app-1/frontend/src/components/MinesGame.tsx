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

interface MinesGameProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

type TileState = 'hidden' | 'revealed' | 'mine';

interface GameState {
  grid: TileState[][];
  minePositions: Set<string>;
  revealedCount: number;
  gameStatus: 'playing' | 'won' | 'lost';
  betAmount: number;
  mineCount: number;
  currentMultiplier: number;
  betInputActive?: boolean;
  betInputValue?: string | number;
}

const MIN_BET = 0.01;

const MinesGame: React.FC<MinesGameProps> = ({ onClose, balance, onEarn }) => {
  const [gameState, setGameState] = useState<GameState>({
    grid: Array(5).fill(null).map(() => Array(5).fill('hidden')),
    minePositions: new Set(),
    revealedCount: 0,
    gameStatus: 'won', // Start in a non-playing state to force new game
    betAmount: roundMoney(1),
    mineCount: 3,
    currentMultiplier: 1.0,
    betInputActive: false,
    betInputValue: 1,
  });

  const calculateMultiplier = useCallback((revealedCount: number, mineCount: number) => {
    if (revealedCount === 0) return 1.0;
    
    // Stake's exact multiplier tables based on mines and revealed gems
    const multiplierTables: { [key: number]: number[] } = {
      1: [1.03, 1.07, 1.12, 1.18, 1.24, 1.32, 1.41, 1.51, 1.63, 1.77, 1.94, 2.14, 2.37, 2.66, 3.00, 3.43, 3.96, 4.62, 5.45, 6.49, 7.84, 9.60, 12.00, 15.36, 20.25],
      2: [1.08, 1.17, 1.29, 1.43, 1.60, 1.80, 2.04, 2.33, 2.68, 3.10, 3.62, 4.26, 5.06, 6.05, 7.29, 8.84, 10.80, 13.28, 16.50, 20.67, 26.15, 33.44, 43.20, 56.57, 75.09],
      3: [1.14, 1.30, 1.50, 1.74, 2.04, 2.41, 2.85, 3.39, 4.06, 4.88, 5.89, 7.16, 8.77, 10.81, 13.45, 16.87, 21.33, 27.17, 34.85, 45.05, 58.52, 76.69, 101.38, 135.18, 181.24],
      4: [1.21, 1.45, 1.75, 2.13, 2.62, 3.23, 4.02, 5.04, 6.35, 8.04, 10.24, 13.11, 16.89, 21.89, 28.61, 37.61, 49.71, 66.28, 88.84, 120.14, 163.73, 224.64, 310.50, 432.69, 608.18],
      5: [1.29, 1.63, 2.08, 2.67, 3.46, 4.50, 5.91, 7.81, 10.35, 13.78, 18.43, 24.70, 33.20, 44.73, 60.39, 81.89, 111.37, 152.04, 208.53, 287.38, 397.77, 552.75, 771.43, 1081.00, 1521.00],
      6: [1.39, 1.85, 2.48, 3.35, 4.57, 6.26, 8.62, 11.95, 16.68, 23.39, 32.99, 46.75, 66.66, 95.62, 137.87, 199.96, 291.96, 428.04, 630.23, 932.35, 1387.51, 2074.26, 3117.39, 4704.99, 7146.23],
      7: [1.50, 2.11, 2.98, 4.24, 6.06, 8.71, 12.56, 18.19, 26.47, 38.66, 56.74, 83.58, 123.58, 183.37, 272.89, 407.20, 609.78, 916.69, 1383.06, 2094.09, 3178.64, 4844.46, 7409.69, 11387.54, 17581.32],
      8: [1.63, 2.42, 3.64, 5.49, 8.33, 12.70, 19.42, 29.81, 45.91, 70.93, 109.89, 170.72, 265.95, 415.61, 651.33, 1023.48, 1611.98, 2545.57, 4029.35, 6395.76, 10168.22, 16215.55, 25945.14, 41662.23, 67139.37],
      9: [1.78, 2.80, 4.48, 7.21, 11.67, 19.02, 31.12, 51.15, 84.44, 139.74, 231.90, 385.84, 644.73, 1080.21, 1814.69, 3056.16, 5163.42, 8745.28, 14843.98, 25238.77, 42905.11, 73137.31, 124734.63, 213251.07, 365001.84],
      10: [1.95, 3.26, 5.54, 9.49, 16.39, 28.41, 49.54, 86.69, 152.30, 268.52, 475.20, 843.69, 1502.56, 2681.48, 4793.17, 8583.10, 15390.57, 27636.03, 49686.05, 89434.89, 161183.06, 290929.51, 525672.18, 951209.13, 1722376.43],
      11: [2.15, 3.83, 6.93, 12.62, 23.15, 42.67, 79.05, 147.01, 274.28, 513.53, 965.24, 1818.57, 3433.57, 6498.48, 12322.02, 23409.79, 44588.62, 85058.79, 162574.10, 311288.39, 596826.36, 1145847.88, 2202040.54, 4239449.04, 8173536.23],
      12: [2.37, 4.52, 8.73, 16.95, 33.12, 64.94, 127.65, 251.65, 497.30, 984.85, 1956.15, 3897.45, 7784.10, 15574.20, 31227.60, 62724.45, 126238.35, 254376.71, 513253.42, 1036506.84, 2093513.68, 4237027.36, 8574054.72, 17348109.44, 35096218.88],
      13: [2.63, 5.38, 11.12, 23.11, 48.23, 101.08, 212.50, 447.81, 946.50, 2004.52, 4255.61, 9063.04, 19351.49, 41394.18, 88686.48, 190173.89, 408107.35, 876520.80, 1884133.72, 4055364.01, 8738621.46, 18844477.14, 40662228.51, 87912493.10, 190356667.04],
      14: [2.93, 6.43, 14.26, 31.78, 71.03, 159.31, 358.44, 808.99, 1830.23, 4148.02, 9408.04, 21368.10, 48578.23, 110560.02, 251760.04, 573660.10, 1308735.23, 2986677.02, 6820522.95, 15586193.73, 35646445.89, 81539420.54, 186490866.25, 427329995.58, 980009991.04],
      15: [3.28, 7.73, 18.46, 44.31, 106.79, 258.28, 626.28, 1521.48, 3701.60, 9011.90, 21988.57, 53717.77, 131404.68, 321700.36, 788070.89, 1932168.19, 4741606.87, 11647836.87, 28645885.93, 70499711.29, 173618640.17, 427795980.42, 1055083161.03, 2604701996.54, 6436121591.13],
      16: [3.69, 9.41, 24.18, 62.46, 161.99, 421.18, 1098.06, 2870.96, 7524.50, 19763.71, 52035.65, 137295.05, 362788.14, 960368.38, 2547649.01, 6760396.02, 17968056.06, 47788149.49, 127168398.64, 338582396.38, 901554391.01, 2404145042.70, 6411053447.20, 17096142526.25, 45589713403.34],
      17: [4.17, 11.62, 32.44, 90.83, 254.72, 715.62, 2014.74, 5681.28, 16048.59, 45336.45, 128342.06, 363757.68, 1032935.56, 2936723.58, 8361238.23, 23832081.24, 67988231.54, 194251234.41, 555003382.60, 1587752807.44, 4543294878.42, 13009128508.64, 37283795452.55, 106953700292.86, 306983143693.75],
      18: [4.74, 14.52, 44.59, 137.41, 424.28, 1312.87, 4070.70, 12639.67, 39322.68, 122509.34, 381904.18, 1192015.56, 3723316.12, 11634775.88, 36385013.00, 113911290.31, 356573150.97, 1116881221.56, 3498261436.89, 10969065190.21, 34397957095.65, 107874865923.28, 338520831635.25, 1062436036360.29, 3334512613750.92],
      19: [5.44, 18.48, 62.82, 214.19, 731.45, 2500.95, 8565.26, 29373.39, 100890.61, 346702.09, 1192515.20, 4105025.94, 14156837.47, 48863069.12, 168795989.16, 583329467.06, 2018062137.71, 6987816576.49, 24222906015.70, 84007184854.45, 291549641371.43, 1013047844597.00, 3525546055589.46, 12264411193562.11, 42725638176967.37],
      20: [6.30, 23.73, 89.49, 338.60, 1282.25, 4859.45, 18426.95, 69901.21, 265284.60, 1007295.26, 3827692.49, 14554106.68, 55356906.07, 210486998.76, 800854795.71, 3047123031.95, 11601002421.42, 44161209201.40, 168165955965.33, 640616542609.76, 2441178362437.23, 9297179378822.38, 35428039134205.04, 135047549211580.90, 514780887243873.44],
      21: [7.34, 31.29, 133.64, 571.45, 2445.21, 10474.40, 44918.28, 192763.22, 827652.84, 3558287.23, 15300375.08, 65857614.23, 283505001.40, 1220757505.98, 5255745025.75, 22669203611.23, 97866015848.30, 422650068380.10, 1825196795642.45, 7877705814383.48, 34026189462159.10, 147017118808686.88, 635335013197560.00, 2745766557114760.00, 11867077246095104.00],
      22: [8.62, 42.32, 207.97, 1022.65, 5033.17, 24787.52, 122218.07, 602771.34, 2973728.62, 14674851.44, 72451792.09, 357753460.45, 1766745496.21, 8727153851.82, 43130319259.08, 213151494409.89, 1053618662728.45, 5208260367669.23, 25740530303521.13, 127217898517653.56, 629224192586823.31, 3109620962934116.50, 15378104814670582.00, 76090524073352910.00, 376452620366764550.00],
      23: [10.21, 58.19, 331.88, 1894.27, 10819.54, 61831.18, 353219.03, 2018719.19, 11536958.50, 65935763.52, 376768992.14, 2153274232.81, 12306670987.64, 70323263071.62, 402202081409.24, 2299811890452.38, 13148925802399.68, 75193347213598.18, 429936029877559.94, 2459634456443343.00, 14062053322807946.00, 80404304700045264.00, 459912027140258752.00, 2628354724086335488.00, 15032549957634203648.00],
      24: [12.26, 82.20, 551.33, 3700.89, 24839.49, 166835.96, 1120719.74, 7531018.49, 50630924.29, 340458394.33, 2288593296.20, 15382288707.34, 103464246649.30, 695988373331.52, 4683656688877.02, 31524444519155.14, 212163700428542.44, 1428098229632285.75, 9613655239296977.00, 64713721663979844.00, 435490395629838784.00, 2931609900198925312.00, 19735067301335320576.00, 132865953129078095872.00, 894593508754025676800.00]
    };
    
    const table = multiplierTables[mineCount];
    if (!table || revealedCount > table.length) {
      // Fallback to original calculation if no table exists
      const safeSpaces = 25 - mineCount;
      return Math.pow(25 / safeSpaces, revealedCount / safeSpaces);
    }
    
    return table[revealedCount - 1];
  }, []);

  const startNewGame = useCallback(() => {
    if (balance < gameState.betAmount) return;
    
    // Generate mine positions
    const positions = new Set<string>();
    while (positions.size < gameState.mineCount) {
      const row = Math.floor(Math.random() * 5);
      const col = Math.floor(Math.random() * 5);
      positions.add(`${row}-${col}`);
    }

    setGameState(prev => ({
      ...prev,
      grid: Array(5).fill(null).map(() => Array(5).fill('hidden')),
      minePositions: positions,
      revealedCount: 0,
      gameStatus: 'playing',
      currentMultiplier: 1.0,
    }));

    // Deduct bet amount
    onEarn(-roundMoney(gameState.betAmount));
  }, [balance, gameState.betAmount, gameState.mineCount, onEarn]);

  const revealTile = useCallback((row: number, col: number) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.grid[row][col] !== 'hidden') return;

    const tileKey = `${row}-${col}`;
    const isMine = gameState.minePositions.has(tileKey);

    setGameState(prev => {
      const newGrid = prev.grid.map((gridRow, r) =>
        gridRow.map((cell, c) => {
          if (r === row && c === col) {
            return isMine ? 'mine' : 'revealed';
          }
          return cell;
        })
      );

      if (isMine) {
        // Game over - reveal all mines
        const finalGrid = newGrid.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (prev.minePositions.has(`${r}-${c}`)) {
              return 'mine';
            }
            return cell;
          })
        );
        return {
          ...prev,
          grid: finalGrid,
          gameStatus: 'lost',
        };
      } else {
        const newRevealedCount = prev.revealedCount + 1;
        const newMultiplier = calculateMultiplier(newRevealedCount, prev.mineCount);
        
        return {
          ...prev,
          grid: newGrid,
          revealedCount: newRevealedCount,
          currentMultiplier: newMultiplier,
        };
      }
    });
  }, [gameState.gameStatus, gameState.grid, gameState.minePositions, calculateMultiplier]);

  const cashOut = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.revealedCount === 0) return;
    
    const winnings = multiplyMoney(gameState.betAmount, gameState.currentMultiplier);
    onEarn(winnings);
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'won',
    }));
  }, [gameState.gameStatus, gameState.revealedCount, gameState.betAmount, gameState.currentMultiplier, onEarn]);

  const renderTile = (row: number, col: number) => {
    const tileState = gameState.grid[row][col];
    const isClickable = gameState.gameStatus === 'playing' && tileState === 'hidden';
    
    return (
      <button
        key={`${row}-${col}`}
        className={`mines-tile ${tileState} ${isClickable ? 'clickable' : ''}`}
        onClick={() => revealTile(row, col)}
        disabled={!isClickable}
      >
        {tileState === 'revealed' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#10b981" stroke="#059669" strokeWidth="1"/>
            <circle cx="12" cy="12" r="3" fill="#047857" opacity="0.6"/>
          </svg>
        )}
        {tileState === 'mine' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="6" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
            <circle cx="12" cy="12" r="3" fill="#7c2d12"/>
            <path d="M6 6L18 18M18 6L6 18" stroke="#dc2626" strokeWidth="1" opacity="0.8"/>
            <circle cx="8" cy="8" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="16" cy="8" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="8" cy="16" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="16" cy="16" r="1" fill="#fbbf24" opacity="0.8"/>
          </svg>
        )}
      </button>
    );
  };

  return (
    <div className="mines-game">
      {/* Header */}
      <div className="mines-header">
        <h1 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Modern Mine Icon */}
            <rect x="2" y="2" width="20" height="20" rx="3" fill="#1e293b" stroke="#5eead4" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
            <circle cx="12" cy="12" r="2" fill="#7c2d12"/>
            <path d="M8 8L16 16M16 8L8 16" stroke="#dc2626" strokeWidth="1" opacity="0.6"/>
            <circle cx="6" cy="6" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="18" cy="6" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="6" cy="18" r="1" fill="#fbbf24" opacity="0.8"/>
            <circle cx="18" cy="18" r="1" fill="#fbbf24" opacity="0.8"/>
          </svg>
          Mines
        </h1>
        <button onClick={onClose} className="mines-close-btn">←</button>
      </div>

      <div className="mines-content">
        {/* Controls */}
        <div className="mines-controls">
          <div className="mines-balance">
            <span style={{ color: '#5eead4', fontWeight: 'bold' }}>
              Balance: ${formatMoney(balance)}
            </span>
          </div>

          <div className="mines-bet-section">
            <label>Bet Amount</label>
            <div className="mines-bet-controls">
              <button 
                onClick={() => setGameState(prev => {
                  const half = Math.max(MIN_BET, Math.min(roundMoney(balance), sanitizeMoney(multiplyMoney(prev.betAmount, 0.5))));
                  return { ...prev, betAmount: half, betInputValue: half };
                })}
                disabled={gameState.gameStatus === 'playing'}
              >
                ½
              </button>
              <input
                type="number"
                value={gameState.betInputActive ? gameState.betInputValue : gameState.betAmount}
                onFocus={e => {
                  e.target.select();
                  setGameState(prev => ({ ...prev, betInputActive: true, betInputValue: '' }));
                }}
                onBlur={e => {
                  setGameState(prev => {
                    let raw = parseMoneyInput(e.target.value);
                    let clamped = Math.max(MIN_BET, Math.min(sanitizeMoney(raw), roundMoney(balance)));
                    return {
                      ...prev,
                      betInputActive: false,
                      betAmount: clamped,
                      betInputValue: clamped
                    };
                  });
                }}
                onChange={e => {
                  const raw = parseMoneyInput(e.target.value);
                  let clamped = Math.max(MIN_BET, Math.min(sanitizeMoney(raw), roundMoney(balance)));
                  setGameState(prev => ({
                    ...prev,
                    betInputValue: e.target.value,
                    betAmount: clamped,
                  }));
                }}
                min={MIN_BET}
                step="0.01"
                disabled={gameState.gameStatus === 'playing'}
              />
              <button 
                onClick={() => setGameState(prev => ({ ...prev, betAmount: Math.max(MIN_BET, Math.min(roundMoney(balance), sanitizeMoney(multiplyMoney(prev.betAmount, 2)))) }))}
                disabled={gameState.gameStatus === 'playing'}
              >
                2×
              </button>
            </div>
            <div className="mines-bet-controls" style={{ marginTop: '10px' }}>
              <button 
                onClick={() => setGameState(prev => ({ ...prev, betAmount: Math.max(MIN_BET, roundMoney(balance)) }))}
                disabled={balance < MIN_BET || gameState.gameStatus === 'playing'}
                className="all-in-btn"
              >
                All In (${formatMoney(balance)})
              </button>
            </div>
          </div>

          <div className="mines-mine-count">
            <label>Mines: {gameState.mineCount}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={gameState.mineCount}
              onChange={(e) => setGameState(prev => ({ ...prev, mineCount: parseInt(e.target.value) }))}
              disabled={gameState.gameStatus === 'playing'}
            />
          </div>

          <div className="mines-actions">
            <button
              onClick={startNewGame}
              disabled={balance < gameState.betAmount || gameState.gameStatus === 'playing'}
              className="mines-start-btn"
            >
              New Game (${formatMoney(gameState.betAmount)})
            </button>
            
            {gameState.gameStatus === 'playing' && gameState.revealedCount > 0 && (
              <button onClick={cashOut} className="mines-cashout-btn">
                Cash Out ${formatMoney(multiplyMoney(gameState.betAmount, gameState.currentMultiplier))}
              </button>
            )}
          </div>
        </div>

        {/* Game Board */}
        <div className="mines-board">
          <div className="mines-grid">
            {gameState.grid.map((row, rowIndex) =>
              row.map((_, colIndex) => renderTile(rowIndex, colIndex))
            )}
            {gameState.gameStatus !== 'playing' && (
              <div className="mines-game-overlay">
                <div className="mines-overlay-content">
                  <div className="mines-overlay-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1e293b" stroke="#5eead4" strokeWidth="1.5"/>
                      <rect x="6" y="6" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="11" y="6" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="16" y="6" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="6" y="11" width="3" height="3" rx="1" fill="#10b981" stroke="#059669" strokeWidth="0.5"/>
                      <polygon points="7.5,12 8.5,13.5 7.5,15 6.5,13.5" fill="#047857"/>
                      <rect x="11" y="11" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="16" y="11" width="3" height="3" rx="1" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5"/>
                      <circle cx="17.5" cy="12.5" r="1" fill="#7c2d12"/>
                      <rect x="6" y="16" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="11" y="16" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                      <rect x="16" y="16" width="3" height="3" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
                    </svg>
                  </div>
                  <div className="mines-overlay-text">Click "New Game" to start!</div>
                  <div className="mines-overlay-subtext">Choose your bet amount and mine count</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mines-stats">
          <div className="mines-stat">
            <span>Multiplier</span>
            <span style={{ color: '#5eead4', fontWeight: 'bold' }}>
              {gameState.currentMultiplier.toFixed(2)}×
            </span>
          </div>
          <div className="mines-stat">
            <span>Gems Found</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
              {gameState.revealedCount}
            </span>
          </div>
          <div className="mines-stat">
            <span>Status</span>
            <span style={{ 
              color: gameState.gameStatus === 'won' ? '#10b981' : 
                     gameState.gameStatus === 'lost' ? '#dc2626' : '#fbbf24',
              fontWeight: 'bold' 
            }}>
              {gameState.gameStatus === 'won' ? 'Won!' : 
               gameState.gameStatus === 'lost' ? 'Lost!' : 'Playing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinesGame;
