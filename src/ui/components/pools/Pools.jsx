import { useEffect, useState, useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Pools = () => {
  const { readContract, getAllPools, getPoolInfo } = useContext(Context);
  const [pools, setPools] = useState([]);

  async function getPools() {
    if (!readContract) return;
    const allPools = await getAllPools();
    const arr = [];

    for (let i = 0; i < allPools.length; i++) {
      const poolAddress = allPools[i];
      const info = await getPoolInfo(poolAddress);
      arr.push({
        address: poolAddress,
        info: info,
      });
    }

    setPools(arr);
  }

  useEffect(() => {
    getPools();
  }, [readContract]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Все пулы</h3>

      {pools.length === 0 && <div>Нет пулов</div>}

      {pools.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 12,
            marginBottom: 10,
          }}
        >
          <div>
            <b>Пул №{i + 1}</b>
          </div>
          <div>Адрес: {p.address}</div>
          <div>Данные: {JSON.stringify(p.info)}</div>
        </div>
      ))}
    </div>
  );
};

export { Pools };
