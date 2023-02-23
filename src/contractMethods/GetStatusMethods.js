import BettingContract from "../klaytn/BettingContract";

const GetStatus = async (setStatus) => {
  await BettingContract.methods
    .getStatus()
    .call()
    .then((result) => setStatus(result))
    .catch((e) => {
      console.log(e);
    });
};

export default GetStatus;
