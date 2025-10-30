import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Button } from "react-bootstrap";
import { getPools } from "/src/services/factoryMethods/FactoryMethods.js";
import { PoolCard } from "./PoolCard.jsx";
import { CreatePool } from "./CreatePool.jsx";

const Pool = () => {
  const { connect, wallet, getRead, users, setUsers } = useContext(Context);
  const [poolsData, setPoolsData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      await connect();
      const pools = await getPools(getRead());
      setPoolsData(pools);
    })();
  }, [connect, getRead, poolsData, users]);

  const toggleShow = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {wallet !== null && (
        <Button onClick={toggleShow} variant="secondary" className="mt-3">
          {showForm}Создать новый пул
        </Button>
      )}

      {showForm && <CreatePool />}
      <PoolCard props={poolsData} setUsers={setUsers} users={users} />
    </div>
  );
};

export { Pool };
