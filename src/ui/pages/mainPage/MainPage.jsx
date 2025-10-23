import { Balances } from "/src/ui/components/balances/Balances.jsx";
import { Header } from "../../components/header/Header.jsx";
import { Pools } from "../../components/pools/Pools.jsx";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Login } from "../../components/login/Login.jsx";

const MainPage = () => {
  const { wallet } = useContext(Context);

  return (
    <>
      {wallet !== null ? (
        <>
          <Header />
          <div className="d-flex flex-row justify-content-evenly">
            <Balances />
          </div>
        </>
      ) : (
        <>
          <Header />
          <Login />
          <Pools />
        </>
      )}
    </>
  );
};

export { MainPage };
