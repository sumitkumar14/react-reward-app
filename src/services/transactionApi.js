// public/transactions.json will be served as /transactions.json

/**
 * Fetches transactions from the public folder.
 * @returns {Promise<Array<Object>>}
 */
export const getTransactions = async () => {
  try {
    const response = await fetch('/transactions.json');
    if (!response.ok) {
      throw new Error('Failed to load transactions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[getTransactions] Error fetching:', error);
    throw error;
  }
};
