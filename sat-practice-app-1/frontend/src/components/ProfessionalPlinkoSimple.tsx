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
import { getSavedBalance, saveBalance } from '../utils/balanceStorage';

interface ProfessionalPlinkoProps {
  onClose: () => void;
}

type RiskLevel = 'low' | 'medium' | 'high';
type PlayMode = 'manual' | 'auto';

interface GameState {
  balance: number;
  betAmount: number;
  riskLevel: RiskLevel;
  rows: number;
  playMode: PlayMode;
  isAutoPlaying: boolean;
  totalBallsDropped: number;
  lastPayout: number;
  totalWinnings: number;
  recentResults: number[];
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  id: number;
  finished: boolean;
  slotIndex: number;
  multiplier: number;
  payout: number;
  color: string;
}

interface Peg {
  x: number;
  y: number;
  radius: number;
}

interface Slot {
  x: number;
  y: number;
  width: number;
  height: number;
  multiplier: number;
  color: string;
  index: number;
}

// Player-favorable payout tables with slight edge (RTP ~102-105%)
const PAYOUT_TABLES: Record<RiskLevel, Record<number, number[]>> = {
  low: {
    8: [6.0, 2.3, 1.2, 1.1, 0.6, 1.1, 1.2, 2.3, 6.0],
    9: [6.0, 2.2, 1.7, 1.1, 0.8, 0.8, 1.1, 1.7, 2.2, 6.0],
    10: [9.5, 3.2, 1.5, 1.2, 1.1, 0.6, 1.1, 1.2, 1.5, 3.2, 9.5],
    11: [9.0, 3.2, 2.0, 1.4, 1.1, 0.8, 0.8, 1.1, 1.4, 2.0, 3.2, 9.0],
    12: [10.5, 4.2, 2.1, 1.5, 1.2, 1.1, 0.6, 1.1, 1.2, 1.5, 2.1, 4.2, 10.5],
    13: [8.5, 4.2, 3.1, 2.0, 1.3, 1.0, 0.8, 0.8, 1.0, 1.3, 2.0, 3.1, 4.2, 8.5],
    14: [16.0, 5.3, 2.7, 1.7, 1.3, 1.1, 0.9, 0.6, 0.9, 1.1, 1.3, 1.7, 2.7, 5.3, 16.0],
    15: [16.0, 8.5, 3.2, 2.1, 1.6, 1.2, 1.1, 0.6, 0.6, 1.1, 1.2, 1.6, 2.1, 3.2, 8.5, 16.0],
    16: [21.0, 6.3, 3.2, 2.1, 1.5, 1.2, 1.0, 0.8, 0.6, 0.8, 1.0, 1.2, 1.5, 2.1, 3.2, 6.3, 21.0]
  },
  medium: {
    8: [14.0, 3.2, 1.4, 0.8, 0.5, 0.8, 1.4, 3.2, 14.0],
    9: [19.0, 4.2, 1.8, 1.0, 0.6, 0.6, 1.0, 1.8, 4.2, 19.0],
    10: [25.0, 6.3, 2.1, 1.1, 0.7, 0.4, 0.7, 1.1, 2.1, 6.3, 25.0],
    11: [45.0, 7.4, 2.1, 1.2, 0.7, 0.4, 0.4, 0.7, 1.2, 2.1, 7.4, 45.0],
    12: [37.0, 9.5, 3.2, 1.5, 0.9, 0.6, 0.3, 0.6, 0.9, 1.5, 3.2, 9.5, 37.0],
    13: [61.0, 16.0, 4.2, 2.1, 1.1, 0.7, 0.4, 0.3, 0.4, 0.7, 1.1, 2.1, 4.2, 16.0, 61.0],
    14: [61.0, 16.0, 4.2, 2.1, 1.1, 0.7, 0.4, 0.2, 0.4, 0.7, 1.1, 2.1, 4.2, 16.0, 61.0],
    15: [92.0, 19.0, 5.3, 2.1, 1.1, 0.7, 0.4, 0.2, 0.2, 0.4, 0.7, 1.1, 2.1, 5.3, 19.0, 92.0],
    16: [115.0, 26.0, 6.3, 2.7, 1.3, 0.8, 0.5, 0.3, 0.2, 0.3, 0.5, 0.8, 1.3, 2.7, 6.3, 26.0, 115.0]
  },
  high: {
    8: [31.0, 4.3, 1.7, 0.4, 0.3, 0.4, 1.7, 4.3, 31.0],
    9: [46.0, 7.5, 2.2, 0.7, 0.3, 0.3, 0.7, 2.2, 7.5, 46.0],
    10: [80.0, 10.6, 2.2, 0.7, 0.4, 0.2, 0.4, 0.7, 2.2, 10.6, 80.0],
    11: [126.0, 15.0, 4.3, 1.1, 0.4, 0.2, 0.2, 0.4, 1.1, 4.3, 15.0, 126.0],
    12: [178.0, 23.0, 4.3, 1.1, 0.5, 0.3, 0.2, 0.3, 0.5, 1.1, 4.3, 23.0, 178.0],
    13: [273.0, 39.0, 8.5, 2.2, 0.8, 0.3, 0.2, 0.1, 0.2, 0.3, 0.8, 2.2, 8.5, 39.0, 273.0],
    14: [441.0, 58.0, 8.5, 2.2, 0.8, 0.4, 0.2, 0.1, 0.2, 0.4, 0.8, 2.2, 8.5, 58.0, 441.0],
    15: [651.0, 87.0, 14.0, 4.3, 1.1, 0.4, 0.2, 0.05, 0.05, 0.2, 0.4, 1.1, 4.3, 14.0, 87.0, 651.0],
    16: [1050.0, 137.0, 19.0, 4.3, 1.1, 0.5, 0.3, 0.2, 0.05, 0.2, 0.3, 0.5, 1.1, 4.3, 19.0, 137.0, 1050.0]
  }
};

const RISK_COLORS = {
  low: '#10b981',
  medium: '#f59e42',
  high: '#ef4444'
};

const ProfessionalPlinko: React.FC<ProfessionalPlinkoProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const autoPlayIntervalRef = useRef<NodeJS.Timeout>();
  const ballsRef = useRef<Ball[]>([]);
  const pegsRef = useRef<Peg[]>([]);
  const slotsRef = useRef<Slot[]>([]);

  // Game dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const BALL_RADIUS = 6;
  const PEG_RADIUS = 4;

  // Physics constants
  const GRAVITY = 0.4;
  const BOUNCE_DAMPING = 0.8;
  const FRICTION = 0.99;

  const [gameState, setGameState] = useState<GameState>(() => ({
    balance: getSavedBalance() || 1000.00,
    betAmount: 1.00,
    riskLevel: 'medium',
    rows: 12,
    playMode: 'manual',
    isAutoPlaying: false,
    totalBallsDropped: 0,
    lastPayout: 0,
    totalWinnings: 0,
    recentResults: []
  }));

  // Persist balance to localStorage whenever it changes
  useEffect(() => {
    saveBalance(gameState.balance);
  }, [gameState.balance]);

  // Generate pegs in pyramid formation
  const generatePegs = useCallback((rows: number): Peg[] => {
    const pegs: Peg[] = [];
    const startY = 100;
    const endY = CANVAS_HEIGHT - 150;
    const totalHeight = endY - startY;
    const rowSpacing = totalHeight / rows;

    for (let row = 0; row < rows; row++) {
      const y = startY + row * rowSpacing;
      const pegsInRow = row + 3;
      const spacing = 40;
      const totalWidth = (pegsInRow - 1) * spacing;
      const startX = (CANVAS_WIDTH - totalWidth) / 2;

      for (let col = 0; col < pegsInRow; col++) {
        const x = startX + col * spacing;
        pegs.push({ x, y, radius: PEG_RADIUS });
      }
    }

    return pegs;
  }, []);

  // Generate multiplier slots
  const generateSlots = useCallback((rows: number, riskLevel: RiskLevel): Slot[] => {
    const slots: Slot[] = [];
    const payouts = PAYOUT_TABLES[riskLevel][rows];
    const slotCount = rows + 1;
    const slotWidth = 45;
    const slotSpacing = 8;
    const totalWidth = slotCount * slotWidth + (slotCount - 1) * slotSpacing;
    const startX = (CANVAS_WIDTH - totalWidth) / 2;
    const slotY = CANVAS_HEIGHT - 70;
    const slotHeight = 35;

    for (let i = 0; i < slotCount; i++) {
      const multiplier = payouts[i];
      let color = '#10b981';

      if (multiplier < 1) {
        color = '#ef4444';
      } else if (multiplier >= 10) {
        color = '#8b5cf6';
      } else if (multiplier >= 2) {
        color = '#f59e42';
      }

      slots.push({
        x: startX + i * (slotWidth + slotSpacing),
        y: slotY,
        width: slotWidth,
        height: slotHeight,
        multiplier,
        color,
        index: i
      });
    }

    return slots;
  }, []);

  // Initialize pegs and slots
  useEffect(() => {
    pegsRef.current = generatePegs(gameState.rows);
    slotsRef.current = generateSlots(gameState.rows, gameState.riskLevel);
  }, [gameState.rows, gameState.riskLevel, generatePegs, generateSlots]);

  // Physics simulation for ball
  const updateBall = useCallback((ball: Ball): Ball => {
    if (ball.finished) return ball;

    ball.vy += GRAVITY;
    ball.vx *= FRICTION;
    ball.vy *= FRICTION;
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Collision with pegs
    pegsRef.current.forEach(peg => {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius + peg.radius) {
        const angle = Math.atan2(dy, dx);
        const targetX = peg.x + Math.cos(angle) * (ball.radius + peg.radius);
        const targetY = peg.y + Math.sin(angle) * (ball.radius + peg.radius);

        ball.x = targetX;
        ball.y = targetY;

        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vx = Math.cos(angle) * speed * BOUNCE_DAMPING;
        ball.vy = Math.sin(angle) * speed * BOUNCE_DAMPING;

        ball.vx += (Math.random() - 0.5) * 0.5;
      }
    });

    // Canvas boundaries
    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx = Math.abs(ball.vx) * BOUNCE_DAMPING;
    }
    if (ball.x > CANVAS_WIDTH - ball.radius) {
      ball.x = CANVAS_WIDTH - ball.radius;
      ball.vx = -Math.abs(ball.vx) * BOUNCE_DAMPING;
    }

    // Check if ball reached slots
    if (ball.y > CANVAS_HEIGHT - 120 && !ball.finished) {
      const slot = slotsRef.current.find(s => 
        ball.x >= s.x && ball.x <= s.x + s.width
      );

      if (slot) {
        ball.finished = true;
        ball.slotIndex = slot.index;
        ball.multiplier = slot.multiplier;
        ball.payout = multiplyMoney(gameState.betAmount, slot.multiplier);

        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            balance: addMoney(prev.balance, ball.payout),
            lastPayout: ball.payout,
            totalWinnings: addMoney(prev.totalWinnings, subtractMoney(ball.payout, prev.betAmount)),
            recentResults: [ball.multiplier, ...prev.recentResults.slice(0, 9)]
          }));
        }, 500);
      }
    }

    return ball;
  }, [gameState.betAmount]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw pegs
    pegsRef.current.forEach(peg => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(peg.x + 2, peg.y + 2, peg.radius, 0, Math.PI * 2);
      ctx.fill();

      const pegGradient = ctx.createRadialGradient(
        peg.x - 1, peg.y - 1, 0,
        peg.x, peg.y, peg.radius
      );
      pegGradient.addColorStop(0, '#64748b');
      pegGradient.addColorStop(0.7, '#475569');
      pegGradient.addColorStop(1, '#334155');
      
      ctx.fillStyle = pegGradient;
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.beginPath();
      ctx.arc(peg.x - 1.5, peg.y - 1.5, peg.radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw slots
    slotsRef.current.forEach(slot => {
      const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };
      
      const radius = 8;
      
      drawRoundedRect(slot.x + 2, slot.y + 2, slot.width, slot.height, radius);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      
      drawRoundedRect(slot.x, slot.y, slot.width, slot.height, radius);
      ctx.fillStyle = slot.color;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `${slot.multiplier}×`,
        slot.x + slot.width / 2,
        slot.y + slot.height / 2
      );
    });

    // Update and draw balls
    ballsRef.current = ballsRef.current.map(updateBall);

    ballsRef.current.forEach(ball => {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x - ball.vx * 2, ball.y - ball.vy * 2, ball.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalAlpha = 1;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      const gradient = ctx.createRadialGradient(
        ball.x - 2, ball.y - 2, 0,
        ball.x, ball.y, ball.radius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, ball.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(ball.x - 2, ball.y - 2, ball.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    });

    ballsRef.current = ballsRef.current.filter(ball => 
      !ball.finished || Date.now() - ball.id < 2000
    );

    animationRef.current = requestAnimationFrame(animate);
  }, [updateBall]);

  // Start animation
  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Drop ball function
  const dropBall = useCallback(() => {
    if (gameState.betAmount > gameState.balance) return;

    setGameState(prev => ({
      ...prev,
      balance: subtractMoney(prev.balance, prev.betAmount),
      totalBallsDropped: prev.totalBallsDropped + 1
    }));

    const firstRowPegs = 3;
    const spacing = 40;
    const totalWidth = (firstRowPegs - 1) * spacing;
    const startX = (CANVAS_WIDTH - totalWidth) / 2;
    const leftmostPegX = startX;
    const rightmostPegX = startX + totalWidth;
    
    const dropX = leftmostPegX + Math.random() * (rightmostPegX - leftmostPegX);

    const newBall: Ball = {
      x: dropX,
      y: 30,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0,
      radius: BALL_RADIUS,
      id: Date.now() + Math.random(),
      finished: false,
      slotIndex: 0,
      multiplier: 0,
      payout: 0,
      color: RISK_COLORS[gameState.riskLevel]
    };

    ballsRef.current.push(newBall);
  }, [gameState.betAmount, gameState.balance, gameState.riskLevel]);

  // Auto play functionality
  useEffect(() => {
    if (gameState.isAutoPlaying && gameState.playMode === 'auto') {
      autoPlayIntervalRef.current = setInterval(() => {
        if (gameState.betAmount <= gameState.balance) {
          dropBall();
        } else {
          setGameState(prev => ({ ...prev, isAutoPlaying: false }));
        }
      }, 1000);
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [gameState.isAutoPlaying, gameState.playMode, gameState.betAmount, gameState.balance, dropBall]);

  const addBalance = () => {
    setGameState(prev => ({ ...prev, balance: addMoney(prev.balance, 100) }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      overflow: 'auto',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 1200,
        marginBottom: 20,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: '16px 24px',
        border: '1px solid rgba(94, 234, 212, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0f172a'
          }}>
            P
          </div>
          <h1 style={{
            ...applyTypography(typography.heading.lg),
            color: '#5eead4',
            margin: 0,
            fontWeight: 'bold'
          }}>
            Professional Plinko
          </h1>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 10,
            color: '#ef4444',
            padding: '8px 16px',
            cursor: 'pointer',
            ...applyTypography(typography.ui.button.sm),
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
        >
          Close Game
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: 20,
        width: '100%',
        maxWidth: 1200,
        alignItems: 'flex-start'
      }}>
        {/* Left Controls Panel */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(94, 234, 212, 0.2)',
          borderRadius: 20,
          padding: 24,
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Balance */}
          <div style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            borderRadius: 16,
            padding: 16,
            border: '1px solid rgba(94, 234, 212, 0.2)'
          }}>
            <div style={{
              ...applyTypography(typography.heading.lg),
              color: '#5eead4',
              marginBottom: 10,
              fontWeight: 'bold'
            }}>
              ${formatMoney(gameState.balance)}
            </div>
            <button
              onClick={addBalance}
              style={{
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
                border: 'none',
                borderRadius: 10,
                color: '#0f172a',
                padding: '8px 16px',
                cursor: 'pointer',
                ...applyTypography(typography.ui.button.sm),
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(94, 234, 212, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              Add $100
            </button>
          </div>

          {/* Play Mode Toggle */}
          <div>
            <label style={{
              ...applyTypography(typography.ui.label),
              color: '#94a3b8',
              display: 'block',
              marginBottom: 12,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Play Mode
            </label>
            <div style={{
              display: 'flex',
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: 14,
              padding: 4,
              border: '1px solid rgba(94, 234, 212, 0.15)'
            }}>
              <button
                onClick={() => setGameState(prev => ({ 
                  ...prev, 
                  playMode: 'manual',
                  isAutoPlaying: false 
                }))}
                style={{
                  flex: 1,
                  background: gameState.playMode === 'manual' ? 
                    'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)' : 
                    'transparent',
                  border: 'none',
                  borderRadius: 10,
                  color: gameState.playMode === 'manual' ? '#0f172a' : '#cbd5e1',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  ...applyTypography(typography.ui.button.sm),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: gameState.playMode === 'manual' ? '0 4px 12px rgba(94, 234, 212, 0.3)' : 'none'
                }}
              >
                Manual
              </button>
              <button
                onClick={() => setGameState(prev => ({ 
                  ...prev, 
                  playMode: 'auto',
                  isAutoPlaying: false 
                }))}
                style={{
                  flex: 1,
                  background: gameState.playMode === 'auto' ? 
                    'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)' : 
                    'transparent',
                  border: 'none',
                  borderRadius: 10,
                  color: gameState.playMode === 'auto' ? '#0f172a' : '#cbd5e1',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  ...applyTypography(typography.ui.button.sm),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: gameState.playMode === 'auto' ? '0 4px 12px rgba(94, 234, 212, 0.3)' : 'none'
                }}
              >
                Auto
              </button>
            </div>
          </div>

          {/* Bet Amount */}
          <div>
            <label style={{
              ...applyTypography(typography.ui.label),
              color: '#94a3b8',
              display: 'block',
              marginBottom: 12,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Bet Amount
            </label>
            <div style={{ 
              display: 'flex', 
              gap: 8, 
              marginBottom: 12,
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: 12,
              padding: 4,
              border: '1px solid rgba(94, 234, 212, 0.15)'
            }}>
              <span style={{
                color: '#5eead4',
                padding: '8px 12px',
                ...applyTypography(typography.body.md),
                fontWeight: 'bold'
              }}>
                $
              </span>
              <input
                type="number"
                value={gameState.betAmount}
                onChange={(e) => setGameState(prev => ({ 
                  ...prev, 
                  betAmount: sanitizeMoney(parseMoneyInput(e.target.value))
                }))}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textColors.white,
                  padding: '8px 8px',
                  ...applyTypography(typography.body.md),
                  fontWeight: 'bold'
                }}
                step="0.01"
                min="0.01"
              />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0.5, 2, 5, 10].map(multiplier => (
                <button
                  key={multiplier}
                  onClick={() => setGameState(prev => ({ 
                    ...prev, 
                    betAmount: sanitizeMoney(multiplier < 1 ? multiplyMoney(prev.betAmount, multiplier) : addMoney(prev.betAmount, multiplier))
                  }))}
                  style={{
                    flex: 1,
                    background: 'rgba(94, 234, 212, 0.1)',
                    border: '1px solid rgba(94, 234, 212, 0.3)',
                    borderRadius: 8,
                    color: '#5eead4',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    ...applyTypography(typography.ui.caption),
                    fontSize: '11px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {multiplier < 1 ? `${multiplier}×` : `+$${multiplier}`}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Level */}
          <div>
            <label style={{
              ...applyTypography(typography.ui.label),
              color: '#94a3b8',
              display: 'block',
              marginBottom: 12,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Risk Level
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              {['low', 'medium', 'high'].map(risk => (
                <button
                  key={risk}
                  onClick={() => setGameState(prev => ({ ...prev, riskLevel: risk as RiskLevel }))}
                  style={{
                    flex: 1,
                    background: gameState.riskLevel === risk ? 
                      RISK_COLORS[risk as RiskLevel] : 
                      'rgba(30, 41, 59, 0.8)',
                    border: gameState.riskLevel === risk ? 
                      'none' : 
                      '1px solid rgba(94, 234, 212, 0.15)',
                    borderRadius: 10,
                    color: textColors.white,
                    padding: '10px 16px',
                    cursor: 'pointer',
                    ...applyTypography(typography.ui.button.sm),
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    boxShadow: gameState.riskLevel === risk ? 
                      `0 4px 12px ${RISK_COLORS[risk as RiskLevel]}40` : 
                      'none'
                  }}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div>
            <label style={{
              ...applyTypography(typography.ui.label),
              color: '#94a3b8',
              display: 'block',
              marginBottom: 12,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Rows: {gameState.rows}
            </label>
            <div style={{
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: 12,
              padding: 12,
              border: '1px solid rgba(94, 234, 212, 0.15)'
            }}>
              <input
                type="range"
                min="8"
                max="16"
                value={gameState.rows}
                onChange={(e) => setGameState(prev => ({ 
                  ...prev, 
                  rows: parseInt(e.target.value) 
                }))}
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(94, 234, 212, 0.2)',
                  borderRadius: '3px',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* Drop Ball Button */}
          <button
            onClick={gameState.playMode === 'manual' ? dropBall : () => 
              setGameState(prev => ({ ...prev, isAutoPlaying: !prev.isAutoPlaying }))}
            disabled={gameState.betAmount > gameState.balance}
            style={{
              background: gameState.betAmount <= gameState.balance ? 
                (gameState.isAutoPlaying ? 
                  'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                  'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)') : 
                'rgba(75, 85, 99, 0.5)',
              border: 'none',
              borderRadius: 16,
              color: gameState.betAmount <= gameState.balance ? 
                (gameState.isAutoPlaying ? textColors.white : '#0f172a') : 
                '#9ca3af',
              padding: '16px 24px',
              cursor: gameState.betAmount <= gameState.balance ? 'pointer' : 'not-allowed',
              ...applyTypography(typography.ui.button.lg),
              fontWeight: 'bold',
              boxShadow: gameState.betAmount <= gameState.balance ? 
                (gameState.isAutoPlaying ? 
                  '0 6px 20px rgba(239, 68, 68, 0.4)' :
                  '0 6px 20px rgba(94, 234, 212, 0.4)') : 
                'none',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {gameState.playMode === 'manual' ? 
              `Drop Ball - ${formatMoney(gameState.betAmount)}` :
              gameState.isAutoPlaying ? 'Stop Auto' : 'Start Auto'
            }
          </button>
        </div>

        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: '2px solid rgba(94, 234, 212, 0.2)',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        />

        {/* Right Stats Panel */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(94, 234, 212, 0.2)',
          borderRadius: 20,
          padding: 24,
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Stats */}
          <div>
            <h3 style={{
              ...applyTypography(typography.heading.md),
              color: '#5eead4',
              margin: 0,
              marginBottom: 16,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Statistics
            </h3>
            
            <div style={{ 
              marginBottom: 16,
              background: 'rgba(94, 234, 212, 0.1)',
              borderRadius: 12,
              padding: 16,
              border: '1px solid rgba(94, 234, 212, 0.2)'
            }}>
              <div style={{
                ...applyTypography(typography.body.sm),
                color: '#94a3b8',
                fontSize: '12px',
                marginBottom: 4
              }}>
                Balls Dropped
              </div>
              <div style={{
                ...applyTypography(typography.heading.lg),
                color: '#5eead4',
                fontWeight: 'bold'
              }}>
                {gameState.totalBallsDropped}
              </div>
            </div>

            <div style={{ 
              marginBottom: 16,
              background: 'rgba(94, 234, 212, 0.1)',
              borderRadius: 12,
              padding: 16,
              border: '1px solid rgba(94, 234, 212, 0.2)'
            }}>
              <div style={{
                ...applyTypography(typography.body.sm),
                color: '#94a3b8',
                fontSize: '12px',
                marginBottom: 4
              }}>
                Last Payout
              </div>
              <div style={{
                ...applyTypography(typography.heading.lg),
                color: gameState.lastPayout > gameState.betAmount ? '#10b981' : '#ef4444',
                fontWeight: 'bold'
              }}>
                ${formatMoney(gameState.lastPayout)}
              </div>
            </div>

            <div style={{
              background: 'rgba(94, 234, 212, 0.1)',
              borderRadius: 12,
              padding: 16,
              border: '1px solid rgba(94, 234, 212, 0.2)'
            }}>
              <div style={{
                ...applyTypography(typography.body.sm),
                color: '#94a3b8',
                fontSize: '12px',
                marginBottom: 4
              }}>
                Total P&L
              </div>
              <div style={{
                ...applyTypography(typography.heading.lg),
                color: gameState.totalWinnings >= 0 ? '#10b981' : '#ef4444',
                fontWeight: 'bold'
              }}>
                ${gameState.totalWinnings >= 0 ? '+' : ''}${gameState.totalWinnings.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div>
            <h4 style={{
              ...applyTypography(typography.heading.sm),
              color: '#5eead4',
              margin: 0,
              marginBottom: 12,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Recent Results
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              maxHeight: '80px',
              overflowY: 'auto',
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: 12,
              padding: 12,
              border: '1px solid rgba(94, 234, 212, 0.15)'
            }}>
              {gameState.recentResults.map((result, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '32px',
                    height: '24px',
                    background: result >= 1 ? 
                      'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: textColors.white,
                    fontSize: '10px',
                    fontWeight: 'bold',
                    boxShadow: result >= 1 ? 
                      '0 2px 4px rgba(16, 185, 129, 0.3)' : 
                      '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  {result.toFixed(1)}×
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 20,
        padding: '16px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        border: '1px solid rgba(94, 234, 212, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}>
        <div style={{
          width: 20,
          height: 20,
          background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#0f172a'
        }}>
          ©
        </div>
        <span style={{
          ...applyTypography(typography.body.sm),
          color: '#94a3b8',
          fontSize: '14px'
        }}>
          Professional Plinko 2025 • Player-Favorable Odds • Built with React & TypeScript
        </span>
      </div>
    </div>
  );
};

export default ProfessionalPlinko;
