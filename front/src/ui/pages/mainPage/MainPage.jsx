import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";
import Login from "../../components/login/Login.jsx";
import { Header } from "../../components/header/Header.jsx";

const MainPage = () => {
  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export default MainPage;
