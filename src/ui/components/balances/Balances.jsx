import { Context } from "../../../core/context/Context.jsx";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const Balances = () => {
  const { getBalance, wallet } = useContext(Context);
  const [balances, setBalances] = useState([0, 0, 0, 0]);
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const address = formData.get("address");
    const res = await getBalance(address);
    setBalances(res);
    setShowCard(true);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Card className="text-center">
          <Card.Title>Узнать баланс токенов</Card.Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormControl
                required
                name="address"
                type="text"
                placeholder="0x0000000000000000000000000000000000000000"
                defaultValue="0x456155B4ade50Bfa8De235B672D9F190482021A2"
              ></FormControl>
            </FormGroup>
            <Button type="submit" className="m-3">
              УЗНАТЬ БАЛАНС
            </Button>
          </Form>
          {showCard && (
            <Card>
              <Card.Title>Балансы</Card.Title>
              <Card.Body>
                <Card.Text>
                  <ListGroup>
                    <ListGroupItem>
                      Gerda: {Number(balances[0]) / 10 ** 12}
                    </ListGroupItem>
                    <ListGroupItem>
                      Krendel: {Number(balances[1]) / 10 ** 12}{" "}
                    </ListGroupItem>
                    <ListGroupItem>
                      RTK: {Number(balances[2]) / 10 ** 12}{" "}
                    </ListGroupItem>
                    <ListGroupItem>
                      PROFI: {Number(balances[3]) / 10 ** 12}{" "}
                    </ListGroupItem>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Card>
      </div>
    </>
  );
};

export { Balances };
