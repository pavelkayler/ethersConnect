import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Login = () => {
  const { connect, connectWallet, wallet } = useContext(Context);

  useEffect(() => {
    (async () => {
      await connect();
    })();
    }, []);

  return (
      <div className="d-flex flex-column align-items-center m-4">
        <Card className="d-flex justify-content-center align-items-center bg-body-secondary">
          <CardTitle className="m-2">Авторизация</CardTitle>
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <Button onClick={connectWallet}>MetaMask Login</Button>
            <div className="small text-muted mt-2">wallet: {wallet || "-"}</div>
          </CardBody>
        </Card>
      </div>
  );
};

export default Login;
