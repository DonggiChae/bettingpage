import BettingContract from "../klaytn/BettingContract";
import { toast } from "react-toastify";

export const StartBetting = async () => {
  await BettingContract.methods
    .startBetting()
    .send({ from: window.klaytn.selectedAddress, gas: 6000000 })
    .then((result) =>
      toast.success(`${result}`, {
        position: toast.POSITION.TOP_CENTER,
      })
    )
    .catch((e) => {
      console.log(e);
    });
};
