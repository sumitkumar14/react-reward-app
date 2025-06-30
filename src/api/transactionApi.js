export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'TXN001',
          customerId: 'C001',
          customer: 'Alice',
          amount: 120,
          product: 'Bluetooth Speaker',
          date: '2025-04-05',
        },
        {
          id: 'TXN002',
          customerId: 'C001',
          customer: 'Alice',
          amount: 120,
          product: 'Speaker',
          date: '2025-04-05',
        },
        {
          id: 'TXN003',
          customerId: 'C002',
          customer: 'Bob',
          amount: 75,
          product: 'Keyboard',
          date: '2025-04-07',
        },
        {
          id: 'TXN004',
          customerId: 'C003',
          customer: 'Charlie',
          amount: 95,
          product: 'Monitor Stand',
          date: '2025-04-15',
        },
        {
          id: 'TXN005',
          customerId: 'C001',
          customer: 'Alice',
          amount: 200,
          product: 'Smartwatch',
          date: '2025-05-03',
        },
        {
          id: 'TXN006',
          customerId: 'C002',
          customer: 'Bob',
          amount: 130,
          product: 'Noise-Cancelling Headphones',
          date: '2025-05-10',
        },
        {
          id: 'TXN007',
          customerId: 'C003',
          customer: 'Charlie',
          amount: 45,
          product: 'Webcam',
          date: '2025-05-18',
        },
        {
          id: 'TXN008',
          customerId: 'C001',
          customer: 'Alice',
          amount: 60,
          product: 'USB Hub',
          date: '2025-06-01',
        },
        {
          id: 'TXN009',
          customerId: 'C002',
          customer: 'Bob',
          amount: 95,
          product: 'Mechanical Mouse',
          date: '2025-06-05',
        },
        {
          id: 'TXN010',
          customerId: 'C003',
          customer: 'Charlie',
          amount: 155,
          product: 'Ergonomic Chair',
          date: '2025-06-20',
        },
      ]);
    }, 1000);
  });
};
