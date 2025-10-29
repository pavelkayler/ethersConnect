import { Button, Card, CardBody, CardTitle, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { getInfoStaking, getReward, pushToContract, viewReward } from "/src/services/stakingMethods/StakingMethods.js";

const Staking = () => {
  const { connectWallet, getSigner, getStakingWriteContract } = useContext(Context);
  const [signer, setSigner] = useState(null);
  const [stakingInfo, setStakingInfo] = useState({});

  useEffect(() => {
    (async () => {
      await connectWallet();
      setSigner(await getSigner().address);
      const response = await getInfoStaking(getStakingWriteContract());
      console.log(response);
      setStakingInfo(response);
    })();
  }, [connectWallet, getStakingWriteContract]);

  const handleView = (e) => {
    e.preventDefault();
    (async () => {
      await viewReward(getStakingWriteContract());
    })();
  };

  const handlePush = (e) => {
    e.preventDefault();
    (async () => {
      const countToken = e.target[0].value;
      await pushToContract(getStakingWriteContract(), countToken);
    })();
  };

  const handleGetReward = (e) => {
    e.preventDefault();
    (async () => {
      await getReward(getStakingWriteContract());
    })();
  };

  return (
    <>
      <Card>
        <CardTitle>Информация про стэкинг</CardTitle>
        <CardBody>
          <ListGroup>
            <ListGroupItem>Адрес пользователя: {signer?.toString() || "none"}</ListGroupItem>
            <ListGroupItem>Всего PROFI токена застейкано: </ListGroupItem>
            <ListGroupItem>Застейкано пользователем: {stakingInfo.countLp?.toString() || "0"}</ListGroupItem>
            <ListGroupItem>Доступная награда: {stakingInfo.reward?.toString() || "2"}</ListGroupItem>
            <ListGroupItem>Последнее время сбора награды: {new Date(Number(stakingInfo.lastReardTime) * 1000)?.toLocaleString() || 0}</ListGroupItem>
          </ListGroup>
          <Form onSubmit={handlePush}>
            <FormGroup>
              <FormLabel column="sm">Добавить на стэкинг</FormLabel>
              <FormControl required placeholder="1000" type="number" />
            </FormGroup>
            <Button type="submit">Добавить</Button>
          </Form>
          <Button onClick={handleView}>Посмотреть награду</Button>
          <Button onClick={handleGetReward}>Получить награду</Button>
        </CardBody>
      </Card>
    </>
  );
};

export default Staking;
