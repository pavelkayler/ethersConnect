import { createContext, useRef, useState } from "react";
import { ethers } from "ethers";
import abi from "/src/services/factoryMethods/factoryAbi.json";
import stakingAbi from "/src/services/stakingMethods/stakingAbi.json";

const contractAddress = "0x3568Bf65347c2c6f7BF1e51B69733b5dC17431E1";
const stakingAddress = "0x1cBd128c00DAB645484E5B140e86CCd46a5C6167";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const rpcProvider = useRef();
  const browserProvider = useRef();
  const signer = useRef();
  const readContract = useRef();
  const writeContract = useRef();
  const stakingWriteContract = useRef();

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
  const getSigner = () => signer.current;
  const getStakingWriteContract = () => stakingWriteContract.current;

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
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
