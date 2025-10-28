import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { getPools } from "/src/services/factoryMethods/FactoryMethods.js";

const Pool = () => {
  const { connect, read } = useContext(Context);
  const [poolsData, setPoolsData] = useState([]);

  useEffect(() => {
    (async () => {
      await connect();
      const pools = await getPools(read());
      console.log(pools);
      setPoolsData(pools);
    })();
  }, [connect, read]);

  const handleClick = () => {
    console.log(String(poolsData));
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-md-center">
      {poolsData.length > 0 &&
        poolsData.map((pool, index) => (
          <Card className="m-3 p-3" key={index}>
            <CardTitle>
              {pool.aSymbol}-{pool.bSymbol}
            </CardTitle>
            <CardBody>
              <ListGroup>
                <ListGroupItem>poolOwner: {pool.poolOwner}</ListGroupItem>
                <ListGroupItem>poolAddress: {pool.poolAddres}</ListGroupItem>
                <ListGroupItem>aSymbol: {pool.aSymbol}</ListGroupItem>
                <ListGroupItem>bSymbol: {pool.bSymbol}</ListGroupItem>
                <ListGroupItem>
                  countTokenA: {Number(pool.countTokenA) / 10 ** 12}{" "}
                  {pool.aSymbol}
                </ListGroupItem>
                <ListGroupItem>
                  countTokenB: {Number(pool.countTokenB) / 10 ** 12}{" "}
                  {pool.bSymbol}
                </ListGroupItem>
                <ListGroupItem>
                  tokenAWithPrice: {Number(pool.tokenAWithPrice) / 10 ** 18} ETH
                </ListGroupItem>
                <ListGroupItem>
                  tokenBWithPrice: {Number(pool.tokenBWithPrice) / 10 ** 18} ETH
                </ListGroupItem>
                <ListGroupItem>
                  allTokens: {Number(pool.allTokens) / 10 ** 18} ETH
                </ListGroupItem>
              </ListGroup>
            </CardBody>
            <Button onClick={handleClick}>magic</Button>
          </Card>
        ))}
    </div>
  );
};

export { Pool };
