export async function swapToken(readContract, countToken, A) {
  try {
    return await readContract.swapToken(countToken, A);
  } catch (error) {
    console.log(error);
  }
}

export async function supportLiquidity(readContract, countToken, A) {
  try {
    return await readContract.supportLiquidity(countToken, A);
  } catch (error) {
    console.log(error);
  }
}

export async function getPools(readContract) {
  try {
    return await readContract.getPools();
  } catch (error) {
    console.log(error);
  }
}
