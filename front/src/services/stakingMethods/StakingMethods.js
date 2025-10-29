export async function pushToContract(contract, countToken) {
  try {
    return await contract.pushToContract(countToken);
  } catch (error) {
    console.log(error);
  }
}

export async function getReward(contract) {
  try {
    return await contract.getReward();
  } catch (error) {
    console.log(error);
  }
}

export async function viewReward(contract) {
  try {
    return await contract.viewReward();
  } catch (error) {
    console.log(error);
  }
}

export async function getInfoStaking(contract) {
  try {
    return await contract.getInfoStaking();
  } catch (error) {
    console.log(error);
  }
}
