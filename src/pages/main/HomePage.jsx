import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
import useAccount from "@/hook/useAccount";
import useCookie from "@/hook/useCookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  //hooks
  const { getProfileAccount, profileAccount } = useAccount();
  const navigate = useNavigate();
  const { removeCookie, isLoggedIn } = useCookie();
  const selector = useSelector((state) => state.account);
  //variables
  const useraccount = selector.account;
  useEffect(() => {
    if (isLoggedIn()) {
      getProfileAccount();
    }
  }, [useraccount]);

  return (
    <div className="">
      <Header/>
      <Home/>
    </div>
  );
};

export default HomePage;
