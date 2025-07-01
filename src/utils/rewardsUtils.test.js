import {
  calculatePoints,
  sortTransactionsByDate,
  summarizeRewards,
  summarizeMonthlyRewards,
  formatUSD
} from './rewardsUtils';

describe('calculatePoints', () => {
  test('returns 0 for purchases <= $50', () => {
    expect(calculatePoints(30)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
  });

  test('calculates 1 point per $ over $50 up to $100', () => {
    expect(calculatePoints(51)).toBe(1);
    expect(calculatePoints(99)).toBe(49);
    expect(calculatePoints(100)).toBe(50);
  });

  test('calculates 2 points per $ over $100 + 50 for $50-$100', () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(200)).toBe(250);
  });

  test('handles decimal values using floor', () => {
    expect(calculatePoints(99.99)).toBe(49);
    expect(calculatePoints(120.75)).toBe(90); // 120 floored
  });

  test('returns 0 for negative or invalid amounts', () => {
    expect(calculatePoints(-10)).toBe(0);
    expect(calculatePoints(NaN)).toBe(0);
  });
});

describe('sortTransactionsByDate', () => {
  test('sorts transactions in ascending order by date', () => {
    const input = [
      { id: 'T3', date: '2025-06-15' },
      { id: 'T1', date: '2024-03-10' },
      { id: 'T2', date: '2025-01-05' },
    ];

    const result = sortTransactionsByDate(input);

    expect(result.map((t) => t.id)).toEqual(['T1', 'T2', 'T3']);
  });

  test('returns empty array when given empty input', () => {
    expect(sortTransactionsByDate([])).toEqual([]);
  });

  test('does not mutate the original array', () => {
    const input = [
      { id: 'T1', date: '2025-02-10' },
      { id: 'T2', date: '2024-11-25' },
    ];

    const copy = [...input];
    sortTransactionsByDate(input);

    expect(input).toEqual(copy); // confirms immutability
  });
});


describe('summarizeRewards', () => {
  const transactions = [
    { customer: 'Alice', amount: 120, date: '2025-04-01' },
    { customer: 'Alice', amount: 80, date: '2025-04-20' },
    { customer: 'Bob', amount: 50, date: '2025-05-01' },
    { customer: 'Bob', amount: 200, date: '2025-05-15' },
  ];

  test('calculates total reward points per customer', () => {
    const result = summarizeRewards(transactions);

    // Alice: 120 → 90, 80 → 30 → total = 120
    expect(result['Alice']).toEqual({ total: 120 });

    // Bob: 50 → 0, 200 → 250 → total = 250
    expect(result['Bob']).toEqual({ total: 250 });
  });

  test('returns empty object for empty transactions', () => {
    expect(summarizeRewards([])).toEqual({});
  });

  test('handles transactions with missing amount field', () => {
    const data = [{ customer: 'Charlie', date: '2025-06-01' }];
    const result = summarizeRewards(data);

    expect(result['Charlie']).toEqual({ total: 0 });
  });
});

describe('summarizeMonthlyRewards', () => {
  const transactions = [
    {
      id: 'T1',
      customerId: 'C001',
      customer: 'Alice',
      amount: 120,
      date: '2025-04-01',
    },
    {
      id: 'T2',
      customerId: 'C001',
      customer: 'Alice',
      amount: 80,
      date: '2025-04-20',
    },
    {
      id: 'T3',
      customerId: 'C002',
      customer: 'Bob',
      amount: 50,
      date: '2025-05-01',
    },
    {
      id: 'T4',
      customerId: 'C002',
      customer: 'Bob',
      amount: 200,
      date: '2025-05-15',
    },
    {
      id: 'T5',
      customerId: 'C003',
      customer: 'Charlie',
      amount: -100,
      date: '2025-05-20',
    },
  ];

  test('groups and sums correctly by customer, month and year', () => {
    const summary = summarizeMonthlyRewards(transactions);

    expect(summary).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId: 'C001',
          month: 'April',
          year: 2025,
          points: 120,
        }),
        expect.objectContaining({
          customerId: 'C002',
          month: 'May',
          year: 2025,
          points: 250,
        }),
        expect.objectContaining({ customerId: 'C003', points: 0 }), // negative ignored
      ])
    );
  });

  test('handles empty data', () => {
    expect(summarizeMonthlyRewards([])).toEqual([]);
  });

  test('handles missing data fields gracefully', () => {
    const brokenData = [{ customerId: 'C123', customer: 'Zoe', date: '2025-06-01' }];
    const result = summarizeMonthlyRewards(brokenData);
    expect(result[0].points).toBe(0);
  });
});
