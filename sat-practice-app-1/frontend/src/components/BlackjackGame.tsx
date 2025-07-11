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

interface BlackjackGameProps {
  onClose: () => void;
  balance: number;
  onEarn: (amount: number) => void;
}

interface Card {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
}

interface GameState {
  playerCards: Card[];
  dealerCards: Card[];
  deck: Card[];
  gameStatus: 'betting' | 'playing' | 'dealer' | 'finished';
  betAmount: number;
  playerScore: number;
  dealerScore: number;
  result: string;
  canDouble: boolean;
  canSplit: boolean;
}

const MIN_BET = 0.01;

const BlackjackGame: React.FC<BlackjackGameProps> = ({ onClose, balance, onEarn }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerCards: [],
    dealerCards: [],
    deck: [],
    gameStatus: 'betting',
    betAmount: roundMoney(5),
    playerScore: 0,
    dealerScore: 0,
    result: '',
    canDouble: false,
    canSplit: false,
  });
  const [insuranceOffered, setInsuranceOffered] = useState(false);
  const [insuranceBet, setInsuranceBet] = useState(0);
  const [insuranceResolved, setInsuranceResolved] = useState(false);

  useEffect(() => {
    saveBalance(balance);
  }, [balance]);

  const createDeck = useCallback((): Card[] => {
    const suits: Card['suit'][] = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        let value = parseInt(rank);
        if (rank === 'A') value = 11;
        else if (['J', 'Q', 'K'].includes(rank)) value = 10;
        
        deck.push({ suit, rank, value });
      }
    }

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }, []);

  const calculateScore = useCallback((cards: Card[]): number => {
    let score = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.rank === 'A') {
        aces++;
        score += 11;
      } else {
        score += card.value;
      }
    }

    // Convert aces from 11 to 1 if needed
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  }, []);

  const dealCard = useCallback((deck: Card[]): { card: Card; remainingDeck: Card[] } => {
    const card = deck[0];
    const remainingDeck = deck.slice(1);
    return { card, remainingDeck };
  }, []);

  const startNewGame = useCallback(() => {
    if (balance < gameState.betAmount) return;

    const newDeck = createDeck();
    let currentDeck = newDeck;
    // Deal initial cards
    const { card: playerCard1, remainingDeck: deck1 } = dealCard(currentDeck);
    const { card: dealerCard1, remainingDeck: deck2 } = dealCard(deck1);
    const { card: playerCard2, remainingDeck: deck3 } = dealCard(deck2);
    const { card: dealerCard2, remainingDeck: finalDeck } = dealCard(deck3);

    const playerCards = [playerCard1, playerCard2];
    const dealerCards = [dealerCard1, dealerCard2];
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore([dealerCard1]);

    // Deduct bet
    onEarn(roundMoney(-gameState.betAmount));

    // Check for blackjack
    const playerBlackjack = playerScore === 21;
    const dealerBlackjack = calculateScore(dealerCards) === 21;

    let status: GameState['gameStatus'] = 'playing';
    let result = '';
    setInsuranceOffered(false);
    setInsuranceBet(0);
    setInsuranceResolved(false);

    if (dealerCard1.rank === 'A' && !playerBlackjack && !dealerBlackjack) {
      setInsuranceOffered(true);
    }

    if (playerBlackjack && dealerBlackjack) {
      status = 'finished';
      result = 'Push! Both have blackjack';
      onEarn(roundMoney(gameState.betAmount)); // Return bet
    } else if (playerBlackjack) {
      status = 'finished';
      result = 'Blackjack! You win!';
      onEarn(roundMoney(multiplyMoney(gameState.betAmount, 2.5))); // 3:2 payout
    } else if (dealerBlackjack) {
      status = 'finished';
      result = 'Dealer blackjack. You lose.';
    }

    setGameState(prev => ({
      ...prev,
      playerCards,
      dealerCards,
      deck: finalDeck,
      gameStatus: status,
      playerScore,
      dealerScore,
      result,
      canDouble: playerCards.length === 2 && balance >= prev.betAmount,
      canSplit: playerCards.length === 2 && playerCard1.rank === playerCard2.rank && balance >= prev.betAmount,
    }));
  }, [balance, gameState.betAmount, createDeck, dealCard, calculateScore, onEarn]);

  // Insurance logic
  const offerInsurance = () => {
    if (!insuranceOffered || insuranceBet > 0) return;
    const maxInsurance = roundMoney(gameState.betAmount / 2);
    if (balance < maxInsurance) return;
    setInsuranceBet(maxInsurance);
    onEarn(-maxInsurance);
  };

  const resolveInsurance = () => {
    if (!insuranceOffered || insuranceResolved) return;
    setInsuranceResolved(true);
    const dealerBlackjack = calculateScore(gameState.dealerCards) === 21;
    if (dealerBlackjack && insuranceBet > 0) {
      // Insurance pays 2:1
      onEarn(roundMoney(insuranceBet * 3)); // get back insurance + 2x payout
    }
  };

  const stand = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    setGameState(prev => ({ ...prev, gameStatus: 'dealer' }));
    setTimeout(() => {
      setGameState(prev => {
        let dealerCards = [...prev.dealerCards];
        let currentDeck = [...prev.deck];
        let dealerScore = calculateScore(dealerCards);

        // Dealer hits on 16, stands on 17
        while (dealerScore < 17) {
          const { card, remainingDeck } = dealCard(currentDeck);
          dealerCards.push(card);
          currentDeck = remainingDeck;
          dealerScore = calculateScore(dealerCards);
        }

        let result = '';
        if (dealerScore > 21) {
          result = 'Dealer busts! You win!';
          onEarn(roundMoney(prev.betAmount)); // Win: return bet amount as profit (bet already deducted)
        } else if (dealerScore > prev.playerScore) {
          result = 'Dealer wins.';
        } else if (dealerScore < prev.playerScore) {
          result = 'You win!';
          onEarn(roundMoney(prev.betAmount)); // Win: return bet amount as profit (bet already deducted)
        } else {
          result = 'Push! Tie game.';
          onEarn(roundMoney(prev.betAmount)); // Return only the original bet (no profit)
        }

        return {
          ...prev,
          dealerCards,
          deck: currentDeck,
          dealerScore,
          gameStatus: 'finished',
          result,
        };
      });
    }, 1000);
  }, [gameState.gameStatus, dealCard, calculateScore, onEarn]);

  const hit = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.playerScore === 21) {
      stand();
      return;
    }
    const { card, remainingDeck } = dealCard(gameState.deck);
    const newPlayerCards = [...gameState.playerCards, card];
    const newScore = calculateScore(newPlayerCards);
    if (newScore === 21) {
      setGameState(prev => ({
        ...prev,
        playerCards: newPlayerCards,
        deck: remainingDeck,
        playerScore: newScore,
        canDouble: false,
        canSplit: false,
      }));
      setTimeout(() => stand(), 100);
      return;
    }
    setGameState(prev => {
      if (newScore > 21) {
        return {
          ...prev,
          playerCards: newPlayerCards,
          deck: remainingDeck,
          playerScore: newScore,
          gameStatus: 'finished',
          result: 'Bust! You lose.',
          canDouble: false,
          canSplit: false,
        };
      }
      return {
        ...prev,
        playerCards: newPlayerCards,
        deck: remainingDeck,
        playerScore: newScore,
        canDouble: false,
        canSplit: false,
      };
    });
  }, [gameState, dealCard, calculateScore, stand]);

  const doubleDown = useCallback(() => {
    if (!gameState.canDouble || balance < gameState.betAmount) return;

    // Double the bet
    onEarn(roundMoney(-gameState.betAmount));
    
    const { card, remainingDeck } = dealCard(gameState.deck);
    const newPlayerCards = [...gameState.playerCards, card];
    const newScore = calculateScore(newPlayerCards);

    setGameState(prev => ({
      ...prev,
      playerCards: newPlayerCards,
      deck: remainingDeck,
      playerScore: newScore,
      betAmount: roundMoney(multiplyMoney(prev.betAmount, 2)),
      canDouble: false,
      canSplit: false,
    }));

    if (newScore > 21) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'finished',
        result: 'Bust! You lose.',
      }));
    } else {
      // Automatically stand after double down
      stand();
    }
  }, [gameState, balance, dealCard, calculateScore, onEarn, stand]);

  const renderCard = (card: Card, hidden = false) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    
    return (
      <div className={`blackjack-card ${hidden ? 'hidden' : ''}`}>
        {hidden ? (
          <div className="card-back">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="60" rx="4" fill="#4f46e5"/>
              <rect x="4" y="4" width="32" height="52" rx="2" fill="#6366f1" opacity="0.8"/>
              <circle cx="20" cy="30" r="8" fill="white" opacity="0.9"/>
              <circle cx="20" cy="30" r="4" fill="#4f46e5"/>
              <path d="M16 26L20 30L24 26" stroke="white" strokeWidth="1" fill="none"/>
              <path d="M16 34L20 30L24 34" stroke="white" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        ) : (
          <>
            <div className={`card-rank ${isRed ? 'red' : 'black'}`}>
              {card.rank}
            </div>
            <div className={`card-suit ${isRed ? 'red' : 'black'}`}>
              {card.suit}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="blackjack-game">
      {/* Header */}
      <div className="blackjack-header">
        <h1 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Modern Blackjack Cards */}
            <rect x="3" y="5" width="8" height="11" rx="2" fill="white" stroke="#374151" strokeWidth="1"/>
            <rect x="13" y="8" width="8" height="11" rx="2" fill="white" stroke="#374151" strokeWidth="1"/>
            <text x="7" y="12" fontSize="6" fill="#dc2626" textAnchor="middle" fontWeight="bold">A</text>
            <path d="M6 9L7 7L8 9" fill="#dc2626" opacity="0.6"/>
            <text x="17" y="15" fontSize="6" fill="#1f2937" textAnchor="middle" fontWeight="bold">K</text>
            <rect x="15" y="11" width="4" height="2.5" rx="0.5" fill="#1f2937" opacity="0.3"/>
            <circle cx="7" cy="20" r="2" fill="#059669" stroke="#047857" strokeWidth="0.5"/>
            <circle cx="17" cy="20" r="2" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5"/>
          </svg>
          Blackjack
        </h1>
        <button onClick={onClose} className="blackjack-close-btn">←</button>
      </div>
      <div className="blackjack-content" style={{ display: 'flex', flexDirection: 'row', gap: 30, padding: 30 }}>
        {/* Controls + Actions column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 300 }}>
          <div className="blackjack-controls">
            {/* Controls */}
            <div className="blackjack-balance">
              <span style={{ color: '#5eead4', fontWeight: 'bold' }}>
                Balance: {formatMoney(balance)}
              </span>
            </div>

            <div className="blackjack-bet-section">
              <label>Bet Amount</label>
              <div className="blackjack-bet-controls">
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
              <div className="blackjack-bet-controls" style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => setGameState(prev => ({ ...prev, betAmount: Math.max(MIN_BET, roundMoney(balance)) }))}
                  disabled={balance < MIN_BET}
                  className="all-in-btn"
                >
                  All In ({formatMoney(balance)})
                </button>
              </div>
            </div>

            {gameState.gameStatus === 'betting' && (
              <button
                onClick={startNewGame}
                disabled={balance < gameState.betAmount}
                className="blackjack-deal-btn"
              >
                Deal ({formatMoney(gameState.betAmount)})
              </button>
            )}
          </div>
          {/* Action buttons directly below controls, left of table */}
          {gameState.gameStatus === 'playing' && (
            <div className="blackjack-actions" style={{ width: '100%', marginTop: 18 }}>
              {gameState.playerScore < 21 && (
                <button onClick={hit} className="blackjack-action-btn">Hit</button>
              )}
              <button onClick={stand} className="blackjack-action-btn">Stand</button>
              {gameState.canDouble && (
                <button onClick={doubleDown} className="blackjack-action-btn">
                  Double ({formatMoney(gameState.betAmount)})
                </button>
              )}
            </div>
          )}
          {gameState.gameStatus === 'finished' && (
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStatus: 'betting', result: '' }))}
              className="blackjack-new-game-btn"
              style={{ marginTop: 18, width: '100%' }}
            >
              New Game
            </button>
          )}
        </div>
        {/* Game Table */}
        <div className="blackjack-table" style={{ flex: 1, marginLeft: 0 }}>
          {/* Dealer */}
          <div className="blackjack-dealer">
            <h3>Dealer {gameState.gameStatus !== 'betting' && `(${gameState.dealerScore})`}</h3>
            <div className="blackjack-cards">
              {gameState.dealerCards.map((card, index) => (
                <div key={index}>
                  {renderCard(card, gameState.gameStatus === 'playing' && index === 1)}
                </div>
              ))}
            </div>
          </div>

          {/* Player */}
          <div className="blackjack-player">
            <h3>You {gameState.gameStatus !== 'betting' && `(${gameState.playerScore})`}</h3>
            <div className="blackjack-cards">
              {gameState.playerCards.map((card, index) => (
                <div key={index}>
                  {renderCard(card)}
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          {gameState.result && (
            <div className="blackjack-result">
              <h2 style={{ 
                color: gameState.result.includes('win') || gameState.result.includes('Blackjack') ? '#10b981' : 
                       gameState.result.includes('Push') ? '#fbbf24' : '#dc2626'
              }}>
                {gameState.result}
              </h2>
            </div>
          )}

          {/* Insurance Offer */}
          {insuranceOffered && !insuranceResolved && (
            <div className="blackjack-insurance">
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                Dealer shows Ace. Take insurance?
              </span>
              <button onClick={offerInsurance} disabled={insuranceBet > 0 || balance < roundMoney(gameState.betAmount / 2)}>
                Insurance ({formatMoney(roundMoney(gameState.betAmount / 2))})
              </button>
              {insuranceBet > 0 && <span style={{ color: '#5eead4', marginLeft: 8 }}>Insurance placed!</span>}
              <button onClick={resolveInsurance} style={{ marginLeft: 12 }}>Continue</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackjackGame;
