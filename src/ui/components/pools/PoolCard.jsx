import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Card } from "react-bootstrap";

const PoolCard = ({}) => {
  const { getPoolInfo } = useContext(Context);
  const [infoPool, setInfoPool] = useState([]);
  useEffect(() => {
    (async () => {
      const info = await getPoolInfo();
      setInfoPool(info);
      console.log(info);
      console.log(infoPool);
    })();
  }, []);

  return (
    <div>
      {/*//   <Card>*/}
      {/*//     <p>*/}
      {/*//       {infoPool.map((item, index) => (*/}
      {/*//         <div key={index}>*/}
      {/*//           <p>{item.first_}</p>*/}
      {/*//         </div>*/}
      {/*//       ))}*/}
      {/*//     </p>*/}
      {/*//   </Card>*/}
    </div>
  );
};
export default PoolCard;
