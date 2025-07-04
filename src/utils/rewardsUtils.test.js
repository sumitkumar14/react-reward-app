import {
  calculatePoints,
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
    expect(calculatePoints(51)).toBe(1);
    expect(calculatePoints(99)).toBe(49);
    expect(calculatePoints(100)).toBe(50);
  });

  test('calculates 2 points per $ over 100 + 50 for 51–100', () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(200)).toBe(250);
  });

  test('handles decimals using floor', () => {
    expect(calculatePoints(120.75)).toBe(90);
    expect(calculatePoints(99.99)).toBe(49);
  });

  test('returns 0 for NaN, negative, or non-numbers', () => {
    expect(calculatePoints(NaN)).toBe(0);
    expect(calculatePoints(-50)).toBe(0);
    expect(calculatePoints(undefined)).toBe(0);
    expect(calculatePoints(null)).toBe(0);
    expect(calculatePoints('100')).toBe(0);
  });
});

describe('summarizeRewards', () => {
  const txns = [
    { customerId: 'C001', customer: 'Alice', amount: 120 },
    { customerId: 'C001', customer: 'Alice', amount: 80 },
    { customerId: 'C002', customer: 'Bob', amount: 200 },
    { customerId: 'C003', customer: 'Charlie', amount: -50 },
  ];

  test('aggregates rewards per customer by ID', () => {
    const result = summarizeRewards(txns);
    expect(result).toEqual({
      C001: { name: 'Alice', total: 120 },
      C002: { name: 'Bob', total: 250 },
      C003: { name: 'Charlie', total: 0 },
    });
  });

  test('returns empty object when input is empty', () => {
    expect(summarizeRewards([])).toEqual({});
  });

  test('handles missing amount gracefully', () => {
    const broken = [{ customerId: 'C123', customer: 'Zoe' }];
    const result = summarizeRewards(broken);
    expect(result).toEqual({ C123: { name: 'Zoe', total: 0 } });
  });
});

describe('summarizeMonthlyRewards', () => {
  const txns = [
    {
      customerId: 'C001',
      customer: 'Alice',
      date: '2025-04-01',
      amount: 120,
    },
    {
      customerId: 'C001',
      customer: 'Alice',
      date: '2025-04-20',
      amount: 80,
    },
    {
      customerId: 'C002',
      customer: 'Bob',
      date: '2025-05-15',
      amount: 200,
    },
    {
      customerId: 'C003',
      customer: 'Charlie',
      date: '2025-06-10',
      amount: -100,
    },
  ];

  test('groups by customer + month + year and sums points', () => {
    const result = summarizeMonthlyRewards(txns);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId: 'C001',
          name: 'Alice',
          month: 'April',
          year: 2025,
          points: 120,
        }),
        expect.objectContaining({
          customerId: 'C002',
          name: 'Bob',
          month: 'May',
          year: 2025,
          points: 250,
        }),
        expect.objectContaining({
          customerId: 'C003',
          name: 'Charlie',
          points: 0,
        }),
      ])
    );
  });

  test('returns empty array when given empty input', () => {
    expect(summarizeMonthlyRewards([])).toEqual([]);
  });

  test('handles broken transactions without amount', () => {
    const txns = [{ customerId: 'C004', customer: 'Dana', date: '2025-07-01' }];
    const result = summarizeMonthlyRewards(txns);
    expect(result[0]).toEqual(
      expect.objectContaining({
        customerId: 'C004',
        name: 'Dana',
        points: 0,
      })
    );
  });
});

describe('sortTransactionsByDate', () => {
  test('sorts by ascending date order', () => {
    const input = [
      { id: 'T3', date: '2025-06-15' },
      { id: 'T1', date: '2024-03-10' },
      { id: 'T2', date: '2025-01-05' },
    ];

    const sorted = sortTransactionsByDate(input);
    expect(sorted.map((t) => t.id)).toEqual(['T1', 'T2', 'T3']);
  });

  test('does not mutate the original array', () => {
    const input = [
      { id: 'T1', date: '2025-02-10' },
      { id: 'T2', date: '2024-11-25' },
    ];
    const copy = [...input];
    sortTransactionsByDate(input);
    expect(input).toEqual(copy);
  });

  test('returns empty array if input is empty', () => {
    expect(sortTransactionsByDate([])).toEqual([]);
  });
});
