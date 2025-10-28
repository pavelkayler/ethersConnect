import { createContext, useState } from "react";
import { ethers } from "ethers";
import abi from "/src/services/factoryMethods/abi.json";
import { getPools } from "../../services/factoryMethods/FactoryMethods.js";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const contractAddress = "0x4A973e0c1CA9a42382510287b7d410E72f8baFd7";
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [readContract, setReadContract] = useState(null);
  const [writeContract, setWriteContract] = useState(null);
  const [poolData, setPoolData] = useState([]);

  async function connect() {
    console.log("connecting");
    const provider = await new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    //prettier-ignore
    const readContract = await new ethers.Contract(contractAddress, abi, provider);
    setReadContract(readContract);
    console.log("Done!");
    console.log(readContract);
  }

  async function connectWallet() {
    console.log("Connect Wallet");
    const signer = await provider.getSigner();
    setSigner(signer);
    const writeContract = await readContract.connect(signer);
    setWriteContract(writeContract);
    console.log(writeContract);
  }

  const getPool = async () => {
    await getPools(readContract).then((data) => {
      setPoolData(data);
    });
  };

  const values = {
    connect,
    connectWallet,
    readContract,
    writeContract,
    signer,
    getPool,
    poolData,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
