/**
 * Simulates an asynchronous API call that retrieves customer transaction data.
 *
 * @async
 * @function getTransactions
 * @returns {Promise<Array<Object>>} Resolves to a list of transaction objects
 */

// src/api/transactionApi.js
const customers = [
  { id: 'C001', name: 'Alice' },
  { id: 'C002', name: 'Bob' },
  { id: 'C003', name: 'Charlie' },
  { id: 'C004', name: 'Diana' },
  { id: 'C005', name: 'Ethan' },
];

const products = [
  'USB Hub',
  'Smartwatch',
  'Bluetooth Speaker',
  'Monitor Stand',
  'Keyboard',
  'Webcam',
  'Desk Lamp',
  'Standing Desk',
  'Portable Charger',
  'Mechanical Mouse',
  'Laptop Stand',
  'USB-C Dock',
  'Wireless Charger',
  'Noise Meter',
];

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomAmount() {
  const base = Math.floor(Math.random() * 200) + 30;
  const decimal = Math.random().toFixed(2);
  return parseFloat(`${base}.${decimal.split('.')[1]}`);
}

function getRandomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

export const getTransactions = async () => {
  const transactions = [];

  const start = new Date('2024-01-01');
  const end = new Date('2025-12-31');
  const total = 300;

  for (let i = 1; i <= total; i++) {
    const customer = getRandomItem(customers);
    const product = getRandomItem(products);
    const amount = getRandomAmount();
    const date = getRandomDate(start, end);

    transactions.push({
      id: `TXN${i.toString().padStart(4, '0')}`,
      customerId: customer.id,
      customer: customer.name,
      amount,
      product,
      date,
    });
  }

  return Promise.resolve(transactions);
};
