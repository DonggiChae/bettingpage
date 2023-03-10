import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import * as authReducer from "@/redux/reducer/auth";
import { RootState } from "@/redux";

import kaikasWhite from "@/assets/kaikas_logo_assets/png/symbol_white_transparent.png";
import kaikasBlue from "@/assets/kaikas_logo_assets/png/symbol_multi_solid.png";
import { useEffect } from "react";

const WalletBox = styled.div<{ user: string | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.user ? "white" : "grey")};
  width: 50px;
  height: 50px;
  border-radius: 11px;
  margin-right: 60px;
  cursor: pointer;
`;

const WalletImg = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
`;

interface Klaytn {
  on: (eventName: string, callback: () => void) => void;
  enable: () => Promise<Array<string>>;
  selectedAddress: string;
  networkVersion: number;
  publicConfigStore: Store;
  _kaikas: any;
}

interface State {
  isEnabled: boolean;
  isUnlocked: boolean;
  networkVersion: number;
  onboardingcomplete: boolean;
}

interface Store {
  subscribe: (callback: () => void) => void;
  getState: () => State;
}

declare global {
  interface Window {
    klaytn?: Klaytn;
  }
}

function ConnectToWallet() {
  // let klaytn: any;
  // if (typeof window !== undefined) {
  //   klaytn = window.klaytn;
  // }

  const klaytn = window?.klaytn;

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  async function isKaikasAvailable() {
    if (!klaytn) {
      return false;
    }

    const results = await Promise.all([
      klaytn._kaikas.isApproved(),
      klaytn._kaikas.isEnabled(),
      klaytn._kaikas.isUnlocked(),
    ]);

    return results.every((res) => res);
  }
  async function loginWithKaikas() {
    if (!klaytn) {
      toast.error("Please install a Kaikas.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const accounts: any = await toast.promise(
        klaytn.enable(),
        {
          pending: "Kaikas ?????? ?????? ???",
        },
        { closeButton: true }
      );
      dispatch(authReducer.setUser(accounts[0]));
      localStorage.setItem("_user", accounts[0]);
      toast.success(`${accounts[0].slice(0, 13)}...??? ???????????????.`);
    } catch {
      toast.error("????????? ?????????????????????.");
    }
  }

  function handleLogin() {
    loginWithKaikas();
  }

  async function handleDone() {
    const isAvailable = await isKaikasAvailable();
    if (isAvailable) {
      toast.success("??? ..??? ????????? ????????????????!");
      return;
    }

    toast.warn("?????? ????????? ????????????.");
    dispatch(authReducer.setUser(null));
    localStorage.removeItem("_user");
  }
  useEffect(() => {
    dispatch(authReducer.setKlaytn(klaytn));
  }, [klaytn]);

  return (
    <WalletBox
      onClick={() => {
        user ? handleDone() : handleLogin();
      }}
      user={user}
    >
      {user ? (
        <WalletImg>
          <Image src={kaikasBlue} alt="kaikas" fill />
        </WalletImg>
      ) : (
        <WalletImg>
          <Image src={kaikasWhite} alt="kaikas" fill />
        </WalletImg>
      )}
    </WalletBox>
  );
}

export default ConnectToWallet;
