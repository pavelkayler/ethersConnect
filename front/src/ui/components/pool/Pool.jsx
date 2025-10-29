import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Button, Card, CardBody, CardTitle, Form, FormCheck, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { getPools } from "/src/services/factoryMethods/FactoryMethods.js";
import { swapToken, supportLiquidity } from "../../../services/poolMethods/PoolMethods.js";
import { ethers } from "ethers";
import abi from "/src/services/poolMethods/poolAbi.json";

const Pool = () => {
  const { connect, getRead, getSigner } = useContext(Context);
  const [poolsData, setPoolsData] = useState([]);

  useEffect(() => {
    (async () => {
      await connect();
      const pools = await getPools(getRead());
      setPoolsData(pools);
    })();
  }, [connect, getRead, poolsData]);

  const handleSwap = (e) => {
    e.preventDefault();
    (async () => {
      const poolAddres = e.target[1].id;
      const poolWriteContract = await new ethers.Contract(poolAddres, abi, getSigner());
      const response = await swapToken(poolWriteContract, e.target[0].value * 10 ** 12, e.target[1].checked);
      return console.log(response);
    })();
  };

  const handleLiquidity = (e) => {
    e.preventDefault();
    (async () => {
      const poolAddres = e.target[1].id;
      const poolWriteContract = await new ethers.Contract(poolAddres, abi, getSigner());
      const response = await supportLiquidity(poolWriteContract, e.target[0].value * 10 ** 12, e.target[1].checked);
      return console.log(response);
    })();
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-md-center flex-wrap">
      {poolsData.length > 0 &&
        poolsData.map((pool, index) => (
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
                  Количество {pool.aSymbol}: {Number(pool.countTokenA) / 10 ** 12} {pool.aSymbol}
                </ListGroupItem>
                <ListGroupItem>
                  Количество {pool.bSymbol}: {Number(pool.countTokenB) / 10 ** 12} {pool.bSymbol}
                </ListGroupItem>
                <ListGroupItem>
                  Состояние {pool.aSymbol} в расчете на ETH : {Number(pool.tokenAWithPrice) / 10 ** 18} ETH
                </ListGroupItem>
                <ListGroupItem>
                  Состояние {pool.bSymbol} в расчете на ETH : {Number(pool.tokenBWithPrice) / 10 ** 18} ETH
                </ListGroupItem>
                <ListGroupItem>Общая цена пула : {Number(pool.allTokens) / 10 ** 18} ETH</ListGroupItem>
              </ListGroup>
            </CardBody>
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
                    <FormCheck type="switch"></FormCheck>
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
                  <FormGroup className="d-flex flex-column align-items-center m-2" controlId={pool.poolAddres}>
                    <FormLabel column="sm">Вносите {pool.aSymbol} ?</FormLabel>
                    <FormCheck type="checkbox"></FormCheck>
                  </FormGroup>
                  <Button type="submit" className="m-3 fw-bold" variant="outline-dark">
                    Поддержать пул
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        ))}
    </div>
  );
};

export { Pool };
