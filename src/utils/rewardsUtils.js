import dayjs from 'dayjs';

/**
 * @module rewardsUtils
 * Utility functions for calculating and summarizing reward points
 * based on customer transactions.
 */

/**
 * Calculates reward points based on a purchase amount.
 * - No points for amounts ≤ $50
 * - 1 point per dollar between $51–$100
 * - 2 points per dollar over $100
 *
 * @param {number} amount - The purchase amount in USD
 * @returns {number} Reward points earned
 */
export function calculatePoints(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    return 0;
  }

  const flooredAmount = Math.floor(amount);

  if (flooredAmount <= 50) return 0;
  if (flooredAmount <= 100) return flooredAmount - 50;
  return (flooredAmount - 100) * 2 + 50;
}

/**
 * Groups and sorts transactions by "Month Year"
 * @param {Array<Object>} transactions
 * @returns {Object<string, Array<Object>>}

/**
 * Groups transactions into a sorted Month-Year structure immutably.
 * @param {Array<Object>} transactions
 * @returns {Object<string, Array<Object>>}
 */
export function groupTransactionsBySortedMonthYear(transactions) {
  const grouped = transactions.reduce((acc, txn) => {
    const date = dayjs(txn.date);
    const key = `${date.format('MMMM')} ${date.year()}`;

    const entry = {
      customerId: txn.customerId,
      customerName: txn.customer,
      transactionId: txn.id,
      amountSpent: txn.amount,
      transactionDate: txn.date,
      transactionYear: date.year(),
      points: calculatePoints(txn.amount),
    };

    return {
      ...acc,
      [key]: [...(acc[key] || []), entry],
    };
  }, {});

  const sortedKeys = Object.keys(grouped).sort((a, b) =>
    dayjs(a, 'MMMM YYYY').isAfter(dayjs(b, 'MMMM YYYY')) ? 1 : -1
  );

  return sortedKeys.reduce((sorted, key) => {
    return { ...sorted, [key]: grouped[key] };
  }, {});
}

/**
 * Aggregates total reward points for each customer.
 *
 * @param {Array<Object>} transactions - List of transaction objects
 * @param {string} transactions[].customer - Customer name
 * @param {number} transactions[].amount - Purchase amount
 * @returns {Object<string, { total: number }>} Rewards summary indexed by customer name
 */
export function summarizeRewards(transactions) {
  return transactions.reduce((acc, { customerId, customer, amount }) => {
    const points = calculatePoints(amount);
    return {
      ...acc,
      [customerId]: {
        name: customer,
        total: (acc[customerId]?.total || 0) + points,
      },
    };
  }, {});
}

/**
 * Summarizes monthly reward points per customer across transactions.
 *
 * @param {Array<Object>} transactions - List of transactions
 * @returns {Array<Object>} List of summaries containing:
 *   - customerId
 *   - name
 *   - month (e.g., "April")
 *   - year (e.g., 2025)
 *   - points (total reward points for that month)
 */
export function summarizeMonthlyRewards(transactions) {
  const summaryMap = transactions.reduce((acc, txn) => {
    const { customerId, customer, date, amount } = txn;
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    const key = `${customerId}-${month}-${year}`;

    const prev = acc[key] || {
      customerId,
      name: customer,
      month,
      year,
      points: 0,
    };

    return {
      ...acc,
      [key]: {
        ...prev,
        points: prev.points + calculatePoints(amount),
      },
    };
  }, {});

  return Object.values(summaryMap);
}

/**
 * Sorts an array of transactions in ascending order by date.
 *
 * @param {Array<Object>} data - Transaction data with a `date` field
 * @returns {Array<Object>} New sorted array (does not mutate original)
 */
export function sortTransactionsByDate(data) {
  return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
}
