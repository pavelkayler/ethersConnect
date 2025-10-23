import { Button, Card, CardBody, CardTitle } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Login = () => {
  const { connect } = useContext(Context);
  return (
    <Card className="align-items-center">
      <CardTitle title="Login">Авторизация</CardTitle>
      <CardBody>
        <div className="d-flex flex-column">
          <Button onClick={connect} className="m-2">
            Подключиться через Metamask
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export { Login };
