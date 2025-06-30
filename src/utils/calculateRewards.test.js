import { calculatePoints, summarizeRewards, summarizeMonthlyRewards } from './calculateRewards';

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

describe('summarizeRewards', () => {
  const transactions = [
    { customer: 'Alice', amount: 120, date: '2025-04-01' },
    { customer: 'Alice', amount: 80, date: '2025-04-20' },
    { customer: 'Bob', amount: 50, date: '2025-05-01' },
    { customer: 'Bob', amount: 200, date: '2025-05-15' },
  ];

  test('sums total and monthly points correctly', () => {
    const result = summarizeRewards(transactions);
    expect(result['Alice'].total).toBe(90 + 30);
    expect(result['Alice'].monthly['April']).toBe(120);
    expect(result['Bob'].total).toBe(250);
    expect(result['Bob'].monthly['May']).toBe(250);
  });

  test('handles empty input', () => {
    expect(summarizeRewards([])).toEqual({});
  });

  test('handles missing fields safely', () => {
    const data = [{ customer: 'Charlie', date: '2025-06-01' }];
    expect(summarizeRewards(data)['Charlie'].total).toBe(0);
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
