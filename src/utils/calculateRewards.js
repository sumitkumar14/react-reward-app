// calculate reward points based on amount
export function calculatePoints(amount) {
    // handle error or unexpected amount
    if (typeof amount !== "number" || Number.isNaN(amount) || amount< 0) {
        return 0; 
      }
    const flooredAmount = Math.floor(amount);
  
    if (flooredAmount <= 50) return 0;
    if (flooredAmount <= 100) return flooredAmount - 50;
    return (flooredAmount - 100) * 2 + 50;
  }
  
export function summarizeRewards(transactions) {
    const result = {};
  
    transactions.forEach(({ customer, amount, date }) => {
      const month = new Date(date).toLocaleString("default", { month: "long" });
      const points = calculatePoints(amount);
  
      if (!result[customer]) result[customer] = { total: 0, monthly: {} };
      result[customer].total += points;
      result[customer].monthly[month] = (result[customer].monthly[month] || 0) + points;
    });
  
    return result;
  }
  
  // summarize monthly rewards for 3 months

  export function summarizeMonthlyRewards(transactions) {
    const summaryMap = {};
  
    transactions.forEach(txn => {
      const { customerId, customer, date, amount } = txn;
      const d = new Date(date);
      const month = d.toLocaleString("default", { month: "long" });
      const year = d.getFullYear();
      const key = `${customerId}-${month}-${year}`;
  
      if (!summaryMap[key]) {
        summaryMap[key] = {
          customerId,
          name: customer,
          month,
          year,
          points: 0
        };
      }
  
      summaryMap[key].points += calculatePoints(amount);
    });
  
    return Object.values(summaryMap);
  }
  
  
  