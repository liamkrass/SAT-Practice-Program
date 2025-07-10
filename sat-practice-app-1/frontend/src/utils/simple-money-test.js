/**
 * Simple Node.js test for money utility functions
 */

// Simple implementation for testing (since we can't import TS files directly)
const roundMoney = (amount) => {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
};

const formatMoney = (amount) => {
  return roundMoney(amount).toFixed(2);
};

const addMoney = (a, b) => {
  return roundMoney(a + b);
};

const subtractMoney = (a, b) => {
  return roundMoney(a - b);
};

const multiplyMoney = (amount, multiplier) => {
  return roundMoney(amount * multiplier);
};

console.log('=== Money Utility Function Tests ===');

// Test floating point issues
console.log('\n--- Testing Floating Point Issue Resolution ---');
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

// Test casino scenarios that were causing issues
console.log('\n--- Testing Casino Game Scenarios ---');

// Plinko payout calculation
const betAmount = 1.50;
const multiplier = 2.5;
const expectedPayout = multiplyMoney(betAmount, multiplier);
console.log(`Bet: $${formatMoney(betAmount)}, Multiplier: ${multiplier}x`);
console.log(`Payout: $${formatMoney(expectedPayout)}`); // Should be exactly 3.75

// Blackjack 3:2 payout
const blackjackBet = 5;
const blackjackPayout = multiplyMoney(blackjackBet, 2.5);
console.log(`Blackjack bet: $${formatMoney(blackjackBet)}, 3:2 payout: $${formatMoney(blackjackPayout)}`);

// Complex balance operations
let balance = 100.00;
console.log(`Starting balance: $${formatMoney(balance)}`);

balance = subtractMoney(balance, 5.50); // Place bet
console.log(`After bet: $${formatMoney(balance)}`);

balance = addMoney(balance, multiplyMoney(5.50, 1.8)); // Win with 1.8x multiplier
console.log(`After win: $${formatMoney(balance)}`);

// Test edge cases that commonly cause decimal issues
console.log('\n--- Testing Edge Cases ---');
console.log('0.1 + 0.1 + 0.1 =', 0.1 + 0.1 + 0.1);
console.log('addMoney(addMoney(0.1, 0.1), 0.1) =', addMoney(addMoney(0.1, 0.1), 0.1));

console.log('multiplyMoney(0.1, 3) =', multiplyMoney(0.1, 3));
console.log('multiplyMoney(1.005, 100) =', multiplyMoney(1.005, 100)); // Should round to 100.50

console.log('\n=== All tests completed ===');
console.log('If all values show clean decimal places (no 0.30000000000000004), the system is working!');
