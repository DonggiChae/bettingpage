import BettingContract from "../klaytn/BettingContract";

const GetEachAmount = async (setRes) => {
  await BettingContract.methods
    .getEachBet()
    .call()
    .then((result) => setRes(result))
    .catch((e) => {
      console.log(e);
    });
};

export default GetEachAmount;
