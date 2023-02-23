import BettingContract from "../klaytn/BettingContract";
import { toast } from "react-toastify";
import ContractAdr from "../contracts/contract-address.json";
import BigNumber from "bignumber.js";

const DEPLOYED_ADDRESS = ContractAdr.lock;

const BettingToken = async (whichSide, klayAmount) => {
  await BettingContract.methods
    .bet(whichSide)
    .estimateGas({
      from: window.klaytn.selectedAddress,
      gas: 6000000,
      value: new BigNumber(klayAmount),
    })
    .then(async (gasAmount) => {
      await BettingContract.methods.bet(whichSide).send({
        from: window.klaytn.selectedAddress,
        gas: gasAmount,
        value: new BigNumber(klayAmount),
      });
    })
    .then(() =>
      toast.success(`You are betting on the ${whichSide}`, {
        position: toast.POSITION.TOP_CENTER,
      })
    )
    .catch((e) => {
      console.error(e);
      // toast.error(`${e}`, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    });
};

export default BettingToken;
