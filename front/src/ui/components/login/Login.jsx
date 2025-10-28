import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Login = () => {
  const { connect, connectWallet } = useContext(Context);

  useEffect(() => {
    (async () => {
      await connect();
    })();
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-center m-5">
        <Card className="d-flex justify-content-center align-items-center bg-body-secondary">
          <CardTitle className="m-2">Авторизация</CardTitle>
          <CardBody>
            <Button onClick={connect}>Connect</Button>
            <Button className="m-2" onClick={connectWallet}>
              Авторизироваться через Metamask
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
