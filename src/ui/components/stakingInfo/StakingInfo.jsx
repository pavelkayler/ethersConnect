import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";

const StakingInfo = () => {
  const { getStakingInfo } = useContext(Context);
  const [stakingInfo, setStakingInfo] = useState({});

  useEffect(() => {
    setStakingInfo(getStakingInfo());
  }, []);

  return (
    <>
      <Card>
        <CardTitle className="text-center">Информация о стакинге</CardTitle>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              Общее количество PROFI: {stakingInfo[0]}
            </ListGroupItem>
            <ListGroupItem>
              Количество застейканных PROFI: {stakingInfo[1]}
            </ListGroupItem>
            <ListGroupItem>
              Последнее время сбора награды: {stakingInfo[3]}
            </ListGroupItem>
            <ListGroupItem>Доступная награда: {stakingInfo[2]}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
};

export { StakingInfo };
