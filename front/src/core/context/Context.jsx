import { createContext, useRef, useState } from "react";
import { ethers } from "ethers";
import abi from "/src/services/factoryMethods/abi.json";

const contractAddress = "0x4A973e0c1CA9a42382510287b7d410E72f8baFd7";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const rpcProvider = useRef();
  const browserProvider = useRef();
  const signer = useRef();
  const readContract = useRef();
  const writeContract = useRef();

  const [wallet, setWallet] = useState(null);

  async function connect() {
    if (!rpcProvider.current) {
      //prettier-ignore
      rpcProvider.current = new ethers.JsonRpcProvider("http://localhost:8545");
    }

    if (!readContract.current) {
      //prettier-ignore
      readContract.current = new ethers.Contract(contractAddress, abi, rpcProvider.current);
    }
  }

  async function connectWallet() {
    // await window.ethereum.request({method: "eth_requestAccounts"});
    browserProvider.current = await new ethers.BrowserProvider(window.ethereum);
    signer.current = await browserProvider.current.getSigner();
    //prettier-ignore
    writeContract.current = new ethers.Contract(contractAddress, abi, signer.current);
    setWallet(await signer.current.getAddress());
    console.log(await signer.current.getAddress());
  }

  const read = () => readContract.current;
  const write = () => writeContract.current;

  const values = {
    connect,
    connectWallet,
    read,
    write,
    contractAddress,
    wallet,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
