// Utility for persistent balance storage in localStorage

const BALANCE_KEY = 'satAppBalance';

export function getSavedBalance(): number {
  const raw = localStorage.getItem(BALANCE_KEY);
  if (!raw) return 0;
  const parsed = parseFloat(raw);
  return isNaN(parsed) ? 0 : parsed;
}

export function saveBalance(balance: number) {
  localStorage.setItem(BALANCE_KEY, balance.toString());
}

export function clearBalance() {
  localStorage.removeItem(BALANCE_KEY);
}
