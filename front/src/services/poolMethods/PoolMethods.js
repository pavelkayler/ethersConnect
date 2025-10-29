export async function swapToken(contract, countToken, A) {
  try {
    return await contract.swapToken(countToken, A);
  } catch (error) {
    console.log(error);
  }
}

export async function supportLiquidity(contract, countToken, A) {
  try {
    return await contract.supportLiquidity(countToken, A);
  } catch (error) {
    console.log(error);
  }
}
