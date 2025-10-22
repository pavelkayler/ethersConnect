import { createContext, useState } from "react";
import { ethers } from "ethers";
import abi from "../../services/abi.json";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const contractAddress = "0xaB71886BFDC05E794Ac5aB087FDB39355eB1146A";
  const [signer, setSigner] = useState("");
  const [wallet, setWallet] = useState("");
  const [readContract, setReadContract] = useState("");
  const [writeContract, setWriteContract] = useState("");

  async function connect() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // prettier-ignore
    const readContract = await new ethers.Contract(contractAddress, abi, provider,);
    const writeContract = await readContract.connect(signer);

    setReadContract(readContract);
    setWriteContract(writeContract);
    setSigner(signer);
    setWallet(signer.address);

    console.log("Current Wallet: " + wallet);
    alert("Connected!");
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
      return await readContract.getStakingInfo();
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    signer,
    wallet,
    setWallet,
    connect,
    getBalance,
    getStakingInfo,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
