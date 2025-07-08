import { getTransactions } from './transactionApi';

describe('getTransactions', () => {
  const mockData = [
    {
      id: 'TXN001',
      customerId: 'C001',
      customer: 'Alice',
      amount: 123.45,
      product: 'Smartwatch',
      date: '2025-04-10',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('resolves transaction data when fetch is successful', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getTransactions();
    expect(fetch).toHaveBeenCalledWith('/transactions.json');
    expect(data).toEqual(mockData);
  });

  test('throws error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getTransactions()).rejects.toThrow('Failed to load transactions');
    expect(fetch).toHaveBeenCalledWith('/transactions.json');
  });

  test('throws error when fetch fails entirely', async () => {
    fetch.mockRejectedValueOnce(new Error('Network failure'));

    await expect(getTransactions()).rejects.toThrow('Network failure');
    expect(fetch).toHaveBeenCalledWith('/transactions.json');
  });
});
