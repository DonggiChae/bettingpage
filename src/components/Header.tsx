import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as authReducer from "@/redux/reducer/auth";
import { RootState } from "@/redux";
import { toast } from "react-toastify";

// import ConnectToKaikas from "./ConnectToWallet";
const ConnectToKaikas = dynamic(
  // typescript에서 props를 전달할때 interface를 정의해줍니다.
  () => import("./ConnectToWallet"), // Component로 사용할 항목을 import합니다.
  { ssr: false } // ssr옵션을 false로 설정해줍니다.
);

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  z-index: 998;
  padding-left: 30px;
  padding-right: 20px;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 30px;
`;

export default function Header() {
  const dispatch = useDispatch();
  const userKaikas = useSelector((state: RootState) => state.auth.user);
  const klaytn = useSelector((state: RootState) => state.auth.klaytn);

  useEffect(() => {
    //kaikas 지갑 없을시 이 effect무효!
    if (!klaytn) {
      return;
    }

    const account = localStorage.getItem("_user");
    const currentKaikasAccount = klaytn?.selectedAddress;

    if (!account || !currentKaikasAccount) {
      dispatch(authReducer.setUser(null));
      localStorage.removeItem("_user");
      return;
    }

    if (account === currentKaikasAccount) {
      dispatch(authReducer.setUser(account));
      localStorage.setItem("_user", account);
    }
  }, [dispatch, userKaikas]);

  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const handleChangeAccounts = () => {
      if (!userKaikas) {
        return;
      }

      const changedAccount = klaytn?.selectedAddress;

      if (userKaikas !== changedAccount) {
        toast.success(`${changedAccount.slice(0, 5)}..계정이 바뀌셨습니다.`);
        dispatch(authReducer.setUser(changedAccount));
        localStorage.setItem("_user", changedAccount);
      }
    };

    klaytn?.on("accountsChanged", handleChangeAccounts);
    return () => {
      klaytn.off("accountsChanged", handleChangeAccounts);
    };
  }, [userKaikas, dispatch]);

  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const networkObj: { [key: string]: string } = {
      1001: "바오밥 테스트넷",
      8217: "메인넷",
    };

    const handleNetworkChanged = () => {
      dispatch(authReducer.setUser(""));
      localStorage.removeItem("_user");
      toast.warn(
        `네트워크가 ${
          networkObj[klaytn.networkVersion]
        }으로 바뀌었습니다. 다시 로그인 해주세요.`
      );
    };

    klaytn?.on("networkChanged", handleNetworkChanged);
    return () => {
      klaytn?.removeListener("networkChanged", handleNetworkChanged);
    };
  }, [dispatch]);
  return (
    <Container>
      <Logo>Bet on the price of Bitcoin</Logo>
      <ConnectToKaikas />
    </Container>
  );
}
