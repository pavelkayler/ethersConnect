import { createContext, useRef, useState } from "react";
import { ethers } from "ethers";
import abi from "/src/services/factoryMethods/factoryAbi.json";
import stakingAbi from "/src/services/stakingMethods/stakingAbi.json";

const contractAddress = "0x3568Bf65347c2c6f7BF1e51B69733b5dC17431E1";
const stakingAddress = "0x6503C1d0D28b206d9DbDd49DE9BD588aA3942590";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const rpcProvider = useRef();
  const browserProvider = useRef();
  const signer = useRef();
  const readContract = useRef();
  const writeContract = useRef();
  const stakingWriteContract = useRef();
  const [users, setUsers] = useState([]);
  const [wallet, setWallet] = useState(null);

  async function connect() {
    if (!rpcProvider.current) {
      rpcProvider.current = new ethers.JsonRpcProvider("http://localhost:8545");
    }

    if (!readContract.current) {
      readContract.current = new ethers.Contract(contractAddress, abi, rpcProvider.current);
    }
  }

  async function connectWallet() {
    // await window.ethereum.request({method: "eth_requestAccounts"});
    browserProvider.current = await new ethers.BrowserProvider(window.ethereum);
    signer.current = await browserProvider.current.getSigner();

    writeContract.current = new ethers.Contract(contractAddress, abi, signer.current);
    stakingWriteContract.current = new ethers.Contract(stakingAddress, stakingAbi, signer.current);

    setWallet(await signer.current.getAddress());
  }

  const getProvider = () => browserProvider.current;
  const getRead = () => readContract.current;
  const getWrite = () => writeContract.current;
  const getStakingWriteContract = () => stakingWriteContract.current;
  const getSigner = () => signer.current;

  const values = {
    connect,
    connectWallet,
    getProvider,
    getRead,
    getWrite,
    getSigner,
    getStakingWriteContract,
    contractAddress,
    wallet,
    setWallet,
    users,
    setUsers,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
