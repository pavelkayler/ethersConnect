import { Button, Card, CardBody, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { createPool } from "../../../services/factoryMethods/FactoryMethods.js";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const CreatePool = () => {
  const { getWrite } = useContext(Context);

  const handleCreate = (e) => {
    e.preventDefault();
    (async () => {
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      console.log(e.target[2].value);
      console.log(e.target[3].value);
      const response = await createPool(getWrite(), e.target[0].value, e.target[1].value, e.target[2].value * 10 ** 12, e.target[3].value * 10 ** 12);
      return console.log(response);
    })();
  };

  return (
    <div className="d-flex flex-column">
      <Card className="mt-2">
        <CardBody>
          <ListGroup>
            <ListGroupItem>адрес GERDA: "0xb168A9fcF7d968014eA27eE7Cc5539B62F2963f2"</ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem>адрес KRENDEL: "0x5891bfD430f4c1BD7d982af9Cf632D102E227C58"</ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem>адрес RTK: "0x7F2bCbEB733c9091E49845ED445Fa5e540387f58"</ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem>адрес LP: "0x011613710CC796E733eeB7399fDB833Db8123f78"</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>

      <Card className="mt-1">
        <CardBody>
          <Form onSubmit={handleCreate} className="d-flex flex-column mt-3">
            <FormGroup>
              <FormLabel column="sm">Адрес первого токена</FormLabel>
              <FormControl required type="text" placeholder="0x0000000000000000000000000000000000000000" />
            </FormGroup>
            <FormGroup>
              <FormLabel column="sm">Адрес второго токена</FormLabel>
              <FormControl required type="text" placeholder="0x0000000000000000000000000000000000000000" />
            </FormGroup>
            <FormGroup>
              <FormLabel column="sm">Количество первого токена</FormLabel>
              <FormControl required type="number" placeholder="1500" />
            </FormGroup>
            <FormGroup>
              <FormLabel column="sm">Количество второго токена</FormLabel>
              <FormControl required type="number" placeholder="1500" />
            </FormGroup>
            <Button className="mt-3" variant="outline-danger" type="submit">
              Создать
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export { CreatePool };
