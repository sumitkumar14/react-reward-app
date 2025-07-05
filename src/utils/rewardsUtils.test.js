import {
  calculatePoints,
  groupTransactionsBySortedMonthYear,
  summarizeRewards,
  summarizeMonthlyRewards,
  sortTransactionsByDate,
} from './rewardsUtils';

describe('calculatePoints', () => {
  test('returns 0 for amounts ≤ 50', () => {
    expect(calculatePoints(30)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
  });

  test('calculates 1 point per $ between 51–100', () => {
    expect(calculatePoints(60)).toBe(10);
    expect(calculatePoints(100)).toBe(50);
  });

  test('calculates 2 points per $ over 100 + 50 base', () => {
    expect(calculatePoints(120)).toBe(90);
  });

  test('floors decimal values', () => {
    expect(calculatePoints(120.75)).toBe(90);
    expect(calculatePoints(99.99)).toBe(49);
  });

  test('returns 0 for invalid or negative inputs', () => {
    expect(calculatePoints(NaN)).toBe(0);
    expect(calculatePoints(null)).toBe(0);
    expect(calculatePoints(undefined)).toBe(0);
    expect(calculatePoints(-30)).toBe(0);
    expect(calculatePoints('80')).toBe(0);
  });
});

describe('groupTransactionsBySortedMonthYear', () => {
  const transactions = [
    { id: 'T1', customerId: 'C001', customer: 'Alice', amount: 120, date: '2025-04-01' },
    { id: 'T2', customerId: 'C002', customer: 'Bob', amount: 80, date: '2025-04-10' },
    { id: 'T3', customerId: 'C003', customer: 'Charlie', amount: 50, date: '2025-05-01' },
  ];

  test('groups and sorts by Month Year', () => {
    const result = groupTransactionsBySortedMonthYear(transactions);

    const keys = Object.keys(result);
    expect(keys).toEqual(['April 2025', 'May 2025']);

    expect(result['April 2025'].length).toBe(2);
    expect(result['May 2025'][0]).toMatchObject({
      customerId: 'C003',
      customerName: 'Charlie',
      points: 0,
    });
  });
});

describe('summarizeRewards', () => {
  const txns = [
    { customerId: 'C001', customer: 'Alice', amount: 120 },
    { customerId: 'C001', customer: 'Alice', amount: 75 },
    { customerId: 'C002', customer: 'Bob', amount: 50 },
  ];

  test('sums rewards per customerId', () => {
    const result = summarizeRewards(txns);
    expect(result).toEqual({
      C001: { name: 'Alice', total: 90 + 25 },
      C002: { name: 'Bob', total: 0 },
    });
  });

  test('handles empty array', () => {
    expect(summarizeRewards([])).toEqual({});
  });
});

describe('summarizeMonthlyRewards', () => {
  const txns = [
    { customerId: 'C001', customer: 'Alice', amount: 100, date: '2025-06-01' },
    { customerId: 'C001', customer: 'Alice', amount: 150, date: '2025-06-15' },
    { customerId: 'C002', customer: 'Bob', amount: 200, date: '2025-07-01' },
  ];

  test('returns points grouped by month/year/customer', () => {
    const result = summarizeMonthlyRewards(txns);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId: 'C001',
          month: 'June',
          year: 2025,
          points: calculatePoints(100) + calculatePoints(150),
        }),
        expect.objectContaining({
          customerId: 'C002',
          month: 'July',
          year: 2025,
          points: calculatePoints(200),
        }),
      ])
    );
  });

  test('handles empty input', () => {
    expect(summarizeMonthlyRewards([])).toEqual([]);
  });
});

describe('sortTransactionsByDate', () => {
  const txns = [
    { id: 'T3', date: '2025-06-15' },
    { id: 'T1', date: '2024-01-01' },
    { id: 'T2', date: '2025-03-12' },
  ];

  test('returns ascending order by date', () => {
    const result = sortTransactionsByDate(txns);
    expect(result.map((t) => t.id)).toEqual(['T1', 'T2', 'T3']);
  });

  test('does not mutate input', () => {
    const original = [...txns];
    sortTransactionsByDate(txns);
    expect(txns).toEqual(original);
  });

  test('handles empty array', () => {
    expect(sortTransactionsByDate([])).toEqual([]);
  });
});
