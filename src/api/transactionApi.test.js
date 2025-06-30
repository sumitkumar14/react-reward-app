// transactionApi.test.js
import { getTransactions } from './transactionApi';

describe('getTransactions', () => {
  test('resolves with an array of 20 transactions', async () => {
    const data = await getTransactions();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(20);

    data.forEach((txn) => {
      expect(txn).toHaveProperty('id');
      expect(txn).toHaveProperty('customerId');
      expect(txn).toHaveProperty('customer');
      expect(txn).toHaveProperty('amount');
      expect(txn).toHaveProperty('product');
      expect(txn).toHaveProperty('date');
    });
  });
});
