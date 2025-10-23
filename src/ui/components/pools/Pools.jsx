// import { Card, Table } from "react-bootstrap";
// import { useContext, useEffect, useState } from "react";
// import { Context } from "../../../core/context/Context.jsx";
import PoolCard from "./PoolCard.jsx";

const Pools = () => {
  return (
    <div className="m-5">
      {/*<Table className="align-middle" striped bordered hover variant="light">*/}
      {/*  <thead>*/}
      {/*    <tr>*/}
      {/*      <th>Адрес пула</th>*/}
      {/*      <th>Владелец пула</th>*/}
      {/*      <th>Токен</th>*/}
      {/*      <th>Количество в пуле</th>*/}
      {/*      <th>Стоимость в ETH</th>*/}
      {/*    </tr>*/}
      {/*  </thead>*/}
      {/*  <tbody>*/}
      {/*    <tr>*/}
      {/*      <td>*/}
      {/*        <tr>0x0dadasffa0d0asfa0f</tr>*/}
      {/*      </td>*/}
      {/*      <td>Tom</td>*/}
      {/*      <td>*/}
      {/*        <tr>token1.name()</tr>*/}
      {/*        <tr>token2.name()</tr>*/}
      {/*      </td>*/}
      {/*      <td>*/}
      {/*        <tr>token1.balanceOf(address(pool))</tr>*/}
      {/*        <tr>token2.balanceOf(address(pool))</tr>*/}
      {/*      </td>*/}
      {/*      <td>*/}
      {/*        <tr>token1 price</tr>*/}
      {/*        <tr>token2 price</tr>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*  </tbody>*/}
      {/*</Table>*/}
      <PoolCard />
    </div>
  );
};

export { Pools };
