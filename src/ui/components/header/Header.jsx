import { Button } from "react-bootstrap";
import { Context } from "../../../core/context/Context.jsx";
import { useContext } from "react";

const Header = () => {
  const { connect, signer } = useContext(Context);

  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-evenly w-100"
        style={{
          backgroundColor: "rebeccapurple",
          height: "8vh",
        }}
      >
        <h1>ПРОФЕССИОНАЛЫ 2026</h1>
        <Button onClick={connect}>ПОДКЛЮЧИТЬ METAMASK</Button>
        <Button
          variant={"outline-info"}
          onClick={() => {
            console.log("Current Signer.Address: " + signer.address);
            alert("Current Signer.Address: " + signer.address);
          }}
        >
          ПОЛУЧИТЬ АДРЕС ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
        </Button>
      </div>
    </>
  );
};

export { Header };
