import { createContext, useState } from "react";
import { ethers } from "ethers";
import abi from "../../services/abi.json";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const contractAddress = "0xF56dd5D7d9d7c1F231994aD7F3334529d80434B9";
  const [readContract, setReadContract] = useState(null);
  const [writeContract, setWriteContract] = useState(null);
  const [poolData, setPoolData] = useState(null);

  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);

  async function connect() {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    setAccount(account);

    // prettier-ignore
    const readContract = await new ethers.Contract(contractAddress, abi, provider);
    const writeContract = await readContract.connect(signer);

    setReadContract(readContract);
    setWriteContract(writeContract);
    setWallet(signer.address);

    alert("Connected!");
    console.log("Current Wallet: " + signer.address);
  }

  async function getBalance(address) {
    try {
      return await readContract.getBalance(address);
    } catch (error) {
      console.log(error);
    }
  }

  async function getStakingInfo() {
    try {
      return await readContract.getStakingInfo(wallet);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPools() {
    try {
      return await readContract.getAllPools();
    } catch (error) {
      console.log(error);
    }
  }

  async function getPoolInfo(address) {
    try {
      return await readContract.getPoolInfo(address);
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    readContract,
    wallet,
    connect,
    getBalance,
    getStakingInfo,
    getAllPools,
    getPoolInfo,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
