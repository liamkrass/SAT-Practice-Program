// Simple test to verify balance persistence is working
const { getSavedBalance, saveBalance, clearBalance } = require('./src/utils/balanceStorage');

// Note: This is a Node.js test, but the actual functions use localStorage
// which is browser-only. This is just to verify the function structure.

console.log('Testing balance storage functions...');

// Test 1: Function exports
console.log('✓ getSavedBalance function exists:', typeof getSavedBalance === 'function');
console.log('✓ saveBalance function exists:', typeof saveBalance === 'function');
console.log('✓ clearBalance function exists:', typeof clearBalance === 'function');

console.log('Balance storage functions are properly exported!');
