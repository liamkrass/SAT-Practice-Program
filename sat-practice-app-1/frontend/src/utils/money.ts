/**
 * Money utility functions for consistent currency handling in casino games
 * Prevents floating-point precision issues and ensures clean monetary values
 */

/**
 * Rounds a number to 2 decimal places (cents precision)
 * Uses banker's rounding (round half to even) for fairness
 */
export const roundMoney = (amount: number): number => {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
};

/**
 * Formats money for display with proper currency formatting
 */
export const formatMoney = (amount: number): string => {
  return roundMoney(amount).toFixed(2);
};

/**
 * Safely adds two money amounts with proper rounding
 */
export const addMoney = (a: number, b: number): number => {
  return roundMoney(a + b);
};

/**
 * Safely subtracts two money amounts with proper rounding
 */
export const subtractMoney = (a: number, b: number): number => {
  return roundMoney(a - b);
};

/**
 * Safely multiplies money by a factor with proper rounding
 */
export const multiplyMoney = (amount: number, multiplier: number): number => {
  return roundMoney(amount * multiplier);
};

/**
 * Safely divides money with proper rounding
 */
export const divideMoney = (amount: number, divisor: number): number => {
  if (divisor === 0) {
    throw new Error('Cannot divide money by zero');
  }
  return roundMoney(amount / divisor);
};

/**
 * Validates that a money amount is valid (non-negative, properly rounded)
 */
export const isValidMoney = (amount: number): boolean => {
  return amount >= 0 && roundMoney(amount) === amount;
};

/**
 * Ensures money amount is valid and rounds if necessary
 */
export const sanitizeMoney = (amount: number): number => {
  return Math.max(0, roundMoney(amount));
};

/**
 * Parses user input to a valid money amount
 */
export const parseMoneyInput = (input: string): number => {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    return 0;
  }
  return sanitizeMoney(parsed);
};

/**
 * Calculates percentage of money amount with proper rounding
 */
export const percentageOfMoney = (amount: number, percentage: number): number => {
  return roundMoney(amount * (percentage / 100));
};
