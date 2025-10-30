import { Button, Card, CardBody, CardTitle, Form, FormCheck, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { ethers } from "ethers";
import poolAbi from "../../../services/poolMethods/poolAbi.json";
import { supportLiquidity, swapToken } from "../../../services/poolMethods/PoolMethods.js";
import { useContext, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";

const PoolCard = ({ props, users, setUsers }) => {
  const { wallet, getSigner } = useContext(Context);
  const [showList, setShowList] = useState(false);

  const handleSwap = (e) => {
    e.preventDefault();
    (async () => {
      const poolAddres = e.target[1].id;
      const poolWriteContract = await new ethers.Contract(poolAddres, poolAbi, getSigner());
      const response = await swapToken(poolWriteContract, e.target[0].value * 10 ** 12, e.target[1].checked);
      return console.log(response);
    })();
  };

  const handleLiquidity = (e) => {
    e.preventDefault();
    (async () => {
      const poolAddres = e.target[1].id;
      console.log(e.target[1].name);
      console.log(e.target[1].id);
      const poolWriteContract = await new ethers.Contract(poolAddres, poolAbi, getSigner());
      const response = await supportLiquidity(poolWriteContract, e.target[0].value * 10 ** 12, e.target[1].checked);
      // users.push(wallet);

      if (!users.includes(wallet)) {
        setUsers([...users, wallet]);
      }

      return console.log(response);
    })();
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-md-center flex-wrap">
      {props.length > 0 &&
        props.map((pool, index) => (
          <Card className="m-3 p-3" key={index}>
            <CardTitle>
              {pool.aSymbol}-{pool.bSymbol}
            </CardTitle>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Владелец пула: {pool.poolOwner}</ListGroupItem>
                <ListGroupItem>Адрес пула: {pool.poolAddres}</ListGroupItem>
                <ListGroupItem>Первый токен: {pool.aSymbol}</ListGroupItem>
                <ListGroupItem>Второй токен: {pool.bSymbol}</ListGroupItem>
                <ListGroupItem>
                  Соотношение токенов: {Number(pool.countTokenA) / 10 ** 12} : {Number(pool.countTokenB) / 10 ** 12}{" "}
                </ListGroupItem>
                <ListGroupItem>
                  Соотношение в ETH: {Number(pool.tokenAWithPrice) / 10 ** 18} : {Number(pool.tokenBWithPrice) / 10 ** 18}{" "}
                </ListGroupItem>
                <ListGroupItem>Общая цена пула : {Number(pool.allTokens) / 10 ** 18} ETH</ListGroupItem>
              </ListGroup>
            </CardBody>
            {wallet !== null ? (
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-around">
                  <Form onSubmit={handleSwap} className="d-flex flex-column">
                    <div className="d-flex flex-column align-items-center">
                      <FormGroup className="d-flex flex-column align-items-center">
                        <FormLabel column="lg">Обмен токенов</FormLabel>
                        <FormControl required type="number" placeholder="300"></FormControl>
                      </FormGroup>
                      <FormGroup className="d-flex flex-column align-items-center m-2" controlId={pool.poolAddres}>
                        <FormLabel column="sm">
                          {pool.aSymbol} to {pool.bSymbol} ?
                        </FormLabel>
                        <FormCheck type="switch" />
                      </FormGroup>
                    </div>
                    <Button type="submit" className="m-3 fw-bold" variant="outline-success">
                      Обменять
                    </Button>
                  </Form>
                  <Form onSubmit={handleLiquidity} className="d-flex flex-column">
                    <div className="d-flex flex-column align-items-center">
                      <FormGroup className="d-flex flex-column align-items-center">
                        <FormLabel column="lg">Поддержка ликвидности</FormLabel>
                        <FormControl required type="number" placeholder="300"></FormControl>
                      </FormGroup>
                      <FormGroup className="d-flex flex-column align-items-center m-2" controlId={pool.poolAddres} name={pool.poolOwner}>
                        <FormLabel column="sm">Вносите {pool.aSymbol} ?</FormLabel>
                        <FormCheck type="checkbox"></FormCheck>
                      </FormGroup>
                      <Button type="submit" className="m-3 fw-bold" variant="outline-dark">
                        Поддержать пул
                      </Button>
                    </div>
                  </Form>
                </div>
                {pool.poolOwner === wallet && (
                  <p>
                    Вложились:
                    <ul>
                      {users.map((user) => (
                        <li key={user}>{user}</li>
                      ))}
                    </ul>
                  </p>
                )}
              </div>
            ) : null}
          </Card>
        ))}
    </div>
  );
};

export { PoolCard };
