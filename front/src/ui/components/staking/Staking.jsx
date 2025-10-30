import { Button, Card, CardBody, CardTitle, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { getInfoStaking, getReward, pushToContract, viewReward } from "/src/services/stakingMethods/StakingMethods.js";

const Staking = () => {
  const { connectWallet, getSigner, getStakingWriteContract } = useContext(Context);
  const [stakingInfo, setStakingInfo] = useState({});
  const signer = getSigner().address;

  useEffect(() => {
    (async () => {
      const response = await getInfoStaking(getStakingWriteContract());
      setStakingInfo(response);
    })();
  }, [connectWallet, getStakingWriteContract, stakingInfo]);

  const handleView = (e) => {
    e.preventDefault();
    (async () => {
      await viewReward(getStakingWriteContract());
    })();
  };

  const handlePush = (e) => {
    e.preventDefault();
    (async () => {
      const countToken = e.target[0].value * 10 ** 12;
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
    <div className="d-flex flex-column align-items-center justify-content-between m-2">
      <Card className="m-3 p-3">
        <CardTitle>Информация про стэкинг</CardTitle>
        <CardBody>
          <ListGroup>
            <ListGroupItem>Адрес пользователя: {signer?.toString() || "none"}</ListGroupItem>
            <ListGroupItem>Застейкано пользователем: {stakingInfo.countLp?.toString() / 10 ** 12 || "0"}</ListGroupItem>
            <ListGroupItem>Доступная награда: {stakingInfo.reward?.toString() / 10 ** 12 || "0"}</ListGroupItem>
            <ListGroupItem>Последнее время сбора награды: {new Date(Number(stakingInfo.lastReardTime) * 1000)?.toLocaleString() || 0}</ListGroupItem>
          </ListGroup>
          <div
            className="d-flex flex-column
           justify-content-between"
          >
            <Form onSubmit={handlePush}>
              <FormGroup>
                <FormLabel column="sm">Добавить на стэкинг</FormLabel>
                <FormControl required placeholder="1000" type="number" />
              </FormGroup>
              <Button type="submit" className="w-100 m-1" variant="outline-primary">
                Добавить
              </Button>
              <div className="d-flex flex-row align-items-center justify-content-evenly m-1">
                <Button onClick={handleView}>Посмотреть награду</Button>
                <Button onClick={handleGetReward}>Получить награду</Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Staking;
