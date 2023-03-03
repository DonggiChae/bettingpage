import caver from "./caver";
import Betting from "../contracts/Betting.json";
import ContractAdr from "../contracts/contract-address.json";

const DEPLOYED_ADDRESS = ContractAdr.lock;
const DEPLOYED_ABI = Betting.abi;

const BettingContract =
  DEPLOYED_ABI &&
  DEPLOYED_ADDRESS &&
  caver &&
  new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

export default BettingContract;
