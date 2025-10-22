import { Balances } from "/src/ui/components/balances/Balances.jsx";
import { Header } from "../../components/header/Header.jsx";
import { AllPools } from "../../components/allPools/AllPools.jsx";
import { Context } from "../../../core/context/Context.jsx";
import { useContext } from "react";
import { StakingInfo } from "../../components/stakingInfo/StakingInfo.jsx";

const MainPage = () => {
  const { wallet } = useContext(Context);
  return (
    <>
      <Header />
      <AllPools />
      {wallet !== "" ? (
        <div className="d-flex flex-row justify-content-evenly">
          <Balances />
          <StakingInfo />
        </div>
      ) : (
        <h4 className="align-self-center">
          Для доступа к остальным функциям необходима авторизация
        </h4>
      )}
    </>
  );
};

export { MainPage };
