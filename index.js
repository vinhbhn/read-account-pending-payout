const axios = require('axios');

const accountID = process.argv[2];
const depth = process.argv[3] || 3;
const endpoint = `http://localhost:8080/accounts/${accountID}/staking-payouts?depth=${depth}`;

const main = async () => {
  const { data } = await axios.get(endpoint);
  const payoutAmount = data.erasPayouts.reduce((acc, cv) => {
    acc = cv.payouts.reduce((total, cv) => {
      if (!cv.claimed) {
        total += Number(cv.nominatorStakingPayout);
      }
      return total;
    }, 0);
    return acc;
  }, 0);

  console.log('Payout Amount: ' + payoutAmount / Math.pow(10, 12) + ' KSM');
};

try {
  main();
} catch (err) {
  console.error(err);
}
