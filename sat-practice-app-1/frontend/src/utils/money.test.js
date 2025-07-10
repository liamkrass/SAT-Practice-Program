/**
 * Test script for money utility functions
 * Run this to verify the money rounding system works correctly
 */

import { 
  formatMoney, 
  roundMoney, 
  addMoney, 
  subtractMoney, 
  multiplyMoney, 
  parseMoneyInput, 
  sanitizeMoney,
  isValidMoney,
  percentageOfMoney 
} from './money';

console.log('=== Money Utility Function Tests ===');

// Test rounding issues that commonly occur with floating point arithmetic
console.log('\n--- Testing Floating Point Issue Resolution ---');

// Classic floating point problems
console.log('0.1 + 0.2 =', 0.1 + 0.2); // Shows 0.30000000000000004
console.log('addMoney(0.1, 0.2) =', addMoney(0.1, 0.2)); // Should show 0.3

console.log('2.4 * 3 =', 2.4 * 3); // Shows 7.199999999999999
console.log('multiplyMoney(2.4, 3) =', multiplyMoney(2.4, 3)); // Should show 7.2

console.log('5.1 - 3.2 =', 5.1 - 3.2); // Shows 1.8999999999999995
console.log('subtractMoney(5.1, 3.2) =', subtractMoney(5.1, 3.2)); // Should show 1.9

// Test formatting
console.log('\n--- Testing Money Formatting ---');
console.log('formatMoney(1) =', formatMoney(1)); // Should show "1.00"
console.log('formatMoney(1.5) =', formatMoney(1.5)); // Should show "1.50"
console.log('formatMoney(1.234567) =', formatMoney(1.234567)); // Should show "1.23"

// Test casino game scenarios
console.log('\n--- Testing Casino Game Scenarios ---');

// Plinko payout calculation
const betAmount = 1.50;
const multiplier = 2.5;
const expectedPayout = multiplyMoney(betAmount, multiplier);
console.log(`Bet: ${formatMoney(betAmount)}, Multiplier: ${multiplier}x`);
console.log(`Payout: ${formatMoney(expectedPayout)}`); // Should be exactly 3.75

// Blackjack 3:2 payout
const blackjackBet = 5;
const blackjackPayout = multiplyMoney(blackjackBet, 2.5);
console.log(`Blackjack bet: ${formatMoney(blackjackBet)}, 3:2 payout: ${formatMoney(blackjackPayout)}`);

// Multiple operations
let balance = 100.00;
balance = subtractMoney(balance, 5.50); // Place bet
balance = addMoney(balance, multiplyMoney(5.50, 1.8)); // Win with 1.8x multiplier
console.log(`Final balance after operations: ${formatMoney(balance)}`);

// Test input sanitization
console.log('\n--- Testing Input Sanitization ---');
console.log('parseMoneyInput("5.50") =', parseMoneyInput("5.50"));
console.log('parseMoneyInput("invalid") =', parseMoneyInput("invalid"));
console.log('parseMoneyInput("") =', parseMoneyInput(""));
console.log('sanitizeMoney(-5) =', sanitizeMoney(-5)); // Should be 0
console.log('sanitizeMoney(5.999) =', sanitizeMoney(5.999)); // Should be 6.00

// Test validation
console.log('\n--- Testing Money Validation ---');
console.log('isValidMoney(5.50) =', isValidMoney(5.50));
console.log('isValidMoney(-1) =', isValidMoney(-1));
console.log('isValidMoney(5.555) =', isValidMoney(5.555)); // Should be false

// Test percentage calculations
console.log('\n--- Testing Percentage Calculations ---');
console.log('10% of $50.00 =', formatMoney(percentageOfMoney(50, 10)));
console.log('33.33% of $150.00 =', formatMoney(percentageOfMoney(150, 33.33)));

console.log('\n=== All tests completed ===');
