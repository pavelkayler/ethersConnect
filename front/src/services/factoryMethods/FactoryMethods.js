export async function getBalances(contract) {
  try {
    return await contract.getBalances();
  } catch (error) {
    console.log(error);
  }
}

export async function getPools(contract) {
  try {
    return await contract.getPools();
  } catch (error) {
    console.log(error);
  }
}

export async function createPool(contract, _tokenA, _tokenB, _countTokenA, _countTokenB) {
  try {
    return await contract.createPool(_tokenA, _tokenB, _countTokenA, _countTokenB);
  } catch (error) {
    console.log(error);
  }
}
