import "/src/services/factoryMethods/FactoryMethods.js";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const Pool = () => {
  const { getPool, poolData } = useContext(Context);

  useEffect(() => {
    (async () => {
      await getPool();
    })();
  });

  return (
    <div className="d-flex flex-column align-items-center">
      {poolData.length > 0
        ? poolData.map((pool, index) => (
            <Card className="m-3 p-3" key={index}>
              <CardTitle>
                {poolData[index].aSymbol}-{poolData[index].bSymbol}
              </CardTitle>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>
                    poolOwner: {poolData[index].poolOwner}
                  </ListGroupItem>
                  <ListGroupItem>
                    poolAddress:{poolData[index].poolAddres}
                  </ListGroupItem>
                  <ListGroupItem>
                    aSymbol: {poolData[index].aSymbol}
                  </ListGroupItem>
                  <ListGroupItem>
                    bSymbol: {poolData[index].bSymbol}
                  </ListGroupItem>
                  <ListGroupItem>
                    countTokenA:{" "}
                    {Number(poolData[index].countTokenA) / 10 ** 12}{" "}
                    {poolData[index].aSymbol}
                  </ListGroupItem>
                  <ListGroupItem>
                    countTokenB:{" "}
                    {Number(poolData[index].countTokenB) / 10 ** 12}{" "}
                    {poolData[index].bSymbol}
                  </ListGroupItem>
                  <ListGroupItem>
                    tokenAWithPrice:{" "}
                    {Number(poolData[index].tokenAWithPrice) / 10 ** 18} ETH
                  </ListGroupItem>
                  <ListGroupItem>
                    tokenBWithPrice:{" "}
                    {Number(poolData[index].tokenBWithPrice) / 10 ** 18} ETH
                  </ListGroupItem>
                  <ListGroupItem>
                    allTokens: {Number(poolData[index].allTokens) / 10 ** 18}{" "}
                    ETH
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          ))
        : null}
    </div>
  );
};

export { Pool };
