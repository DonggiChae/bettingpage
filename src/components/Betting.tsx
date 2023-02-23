import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";

import BettingToken from "@/contractMethods/BettingMethods";
import GetStatus from "@/contractMethods/GetStatusMethods";
import { StartBetting } from "@/contractMethods/StartBettingMethods";
import GetEachAmount from "@/contractMethods/GetBettingAmountsMethod";

const BettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(6, 0, 71);
  width: 800px;
  height: 500px;
  border-radius: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const BettingAmountAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ErrorMsg = styled.span`
  position: absolute;
  top: -181px;
  left: 70px;
  color: red;
  font-size: 12px;
  z-index: 10;
  height: 10px;
  margin: 0px;
  padding: 0px;
  width: 100%;
`;

const ErrorMsgTextBox = styled.span`
  position: absolute;
  top: 260px;
  left: 20px;
  color: red;
  font-size: 12px;
  z-index: 10;
  height: 10px;
  margin: 0;
  padding: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PriceNumber = styled.div`
  font-size: 2.3rem;
  padding: 10px;
  color: #fcd900;
`;

const PriceLabel = styled.div`
  font-size: 2rem;
  padding: 10px;
`;

const BettingExplain = styled.div`
  font-size: 1.2rem;
`;

const BettingDoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BettingDoneHead = styled.div`
  padding: 30px;
  font-size: 1.7rem;
`;

const BettingDoneBody = styled.div`
  display: flex;
  flex-direction: row;
`;
const BettingAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-size: 1.5rem;
  width: 200px;
`;

const BettingAmount = styled.div``;

const BettingAmountLabel = styled.div``;
export default function Betting() {
  const URL = "/getPrice";
  const [bettingAmount, setBettingAmount] = useState("0");
  const [amountErr, setAmountErr] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState("0");
  const [status, setStatus] = useState(true);
  const [eachAmount, setEachAmount] = useState([0, 0, 0]);
  const handleBettingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (!!Number(value) && Number(value) >= 0.01 && Number(value) <= 10) {
      setAmountErr(true);
    } else {
      setAmountErr(false);
    }
    setBettingAmount(value);
  };
  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget;
    if (amountErr) {
      try {
        await BettingToken(name, Number(bettingAmount) * 10 ** 18);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error(`Something Wrong.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const data = {
    ticker: "BTC",
  };

  useEffect(() => {
    const fetchEachPrice = async () => {
      try {
        await GetEachAmount(setStatus);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(URL, JSON.stringify(data));
        setBitcoinPrice(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchEachPrice();
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        await GetStatus(setEachAmount);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStatus();
    console.log(status);
  }, []);
  return (
    <BettingContainer>
      <PriceWrapper>
        <PriceLabel>Bitcoin Price From Binance</PriceLabel>
        <BettingExplain>
          Guess the price in an hour. Prices are received on time. And you can
          place bets for 5 minutes.
        </BettingExplain>
        <PriceNumber>{bitcoinPrice.slice(0, -6)}</PriceNumber>
      </PriceWrapper>
      {status ? (
        <BettingAmountAndButtons>
          <InputWrapper>
            <InputWithLabel
              label="Only betting 10 >= Klaytn >= 0.01."
              onChange={handleBettingAmountChange}
            >
              {bettingAmount}
            </InputWithLabel>
            {!amountErr && (
              <ErrorMsg>
                <ErrorMsgTextBox>Invalid input.</ErrorMsgTextBox>
              </ErrorMsg>
            )}
          </InputWrapper>

          <ButtonContainer>
            <ButtonWrapper>
              <Button name="Up" onClick={handleOnClick}>
                Up
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button name="Same" onClick={handleOnClick}>
                Same
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button name="Down" onClick={handleOnClick}>
                Down
              </Button>
            </ButtonWrapper>
          </ButtonContainer>
        </BettingAmountAndButtons>
      ) : (
        <BettingDoneWrapper>
          <BettingDoneHead>Betting is Done.</BettingDoneHead>
          <BettingDoneBody>
            <BettingAmountWrapper>
              <BettingAmountLabel>Up</BettingAmountLabel>
              <BettingAmount>{eachAmount[0]}</BettingAmount>
            </BettingAmountWrapper>
            <BettingAmountWrapper>
              <BettingAmountLabel>Same</BettingAmountLabel>
              <BettingAmount>{eachAmount[2]}</BettingAmount>
            </BettingAmountWrapper>
            <BettingAmountWrapper>
              <BettingAmountLabel>Down</BettingAmountLabel>
              <BettingAmount>{eachAmount[1]}</BettingAmount>
            </BettingAmountWrapper>
          </BettingDoneBody>
        </BettingDoneWrapper>
      )}
    </BettingContainer>
  );
}
