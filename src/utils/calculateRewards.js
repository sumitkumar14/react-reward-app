// calculate reward points based on amount
export function calculatePoints(amount) {
  // handle error or unexpected amount
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    return 0;
  }
  const flooredAmount = Math.floor(amount);

  if (flooredAmount <= 50) return 0;
  if (flooredAmount <= 100) return flooredAmount - 50;
  return (flooredAmount - 100) * 2 + 50;
}

// calculate total reward points accumulated by each customer;
export function summarizeRewards(transactions) {
    return transactions.reduce((acc, { customer, amount }) => {
      const points = calculatePoints(amount);
  
      return {
        ...acc,
        [customer]: {
          total: (acc[customer]?.total || 0) + points
        }
      };
    }, {});
  }
  

// summarize monthly rewards for 3 months

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
  
