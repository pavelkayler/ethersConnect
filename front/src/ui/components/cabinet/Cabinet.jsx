import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { getBalances } from "../../../services/factoryMethods/FactoryMethods.js";

const Cabinet = () => {
  const { connectWallet, getProvider, getWrite, getSigner } = useContext(Context);
  const [signer, setSigner] = useState(null);
  const [etherBalance, setEtherBalance] = useState(0);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    (async () => {
      await connectWallet();
      setSigner(getSigner().address);

      const etherBalance = await getProvider().getBalance(getSigner());
      setEtherBalance(etherBalance);

      const balances = await getBalances(getWrite());
      setBalances(balances);
    })();
  }, []);

  return (
    <>
      <Card>
        <CardTitle>Балансы</CardTitle>
        <CardBody>
          <ListGroup>
            <ListGroupItem>Адрес пользователя: {signer}</ListGroupItem>
            <ListGroupItem>Баланс в эфире: {Number(etherBalance) / 10 ** 18}</ListGroupItem>
            <ListGroupItem>Баланс GERDA {Number(balances[0]) / 10 ** 12}</ListGroupItem>
            <ListGroupItem>Баланс KRENDEL: {Number(balances[1]) / 10 ** 12}</ListGroupItem>
            <ListGroupItem>Баланс RTK: {Number(balances[2]) / 10 ** 12}</ListGroupItem>
            <ListGroupItem>Баланс LP: {Number(balances[3]) / 10 ** 12}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
};

export default Cabinet;
