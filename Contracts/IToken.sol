// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC20.sol";
// Интерфейс служащий для того, чтобы использовать методы связанные с токенами
interface IToken is IERC20, IERC20Metadata {
     function decimals() external view  override returns(uint8);
     function transfer (address _from, address _to, uint _amount) external;
     function mint(address _to, uint _amount) external;
     function price() external pure  returns(uint);

}