// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
    // Контракты токенов  
contract LpToken is ERC20("Proffesional","PROFI"){
     constructor(){
        _mint(msg.sender, 1000000000000*10**decimals());
    
    }
    // Возвращает число после десятичной запятой
    function decimals() public view virtual override returns(uint8){
        return 12;
    }
    // Метод для перевода токенов вход(от кого, кому, кол-во) 
    function transfer (address _from, address _to, uint _amount) external {
        _transfer(_from, _to, _amount);    
    }
    // Метод для эммиссии токена
    function mint(address _to, uint _amount) external {
        _mint(_to, _amount);
    }
    // Цена за один токен
    function price() external pure  returns(uint){
        return 6000000 wei;
    }

}
contract GerdaToken is ERC20("GerdaCoin","GERDA"){
    // Конструктор для эммиссии токена пользователям 
    constructor(address _tom,address _ben,address _rick ){
        _mint(_tom, 10000*10**decimals());
        _mint(_ben, 10000*10**decimals());
        _mint(_rick, 80000*10**decimals());
    }

    // Возвращает кол-во знаков после запятой
    function decimals() public view virtual override returns(uint8){
        return 12;
    }
    // Цена токена
    function price() external pure  returns(uint){
        return 1000000 wei;
    }
    // Метод для перевода вход(от кого, кому, кол-во)
    function transfer (address _from, address _to, uint _amount) external {
        _transfer(_from, _to, _amount);    
    }
}
contract KrendelToken is ERC20("KrendelCoin","KRENDEL"){
        // Конструктор вход(адреса пользователей) выход эммиссия токена данным пользователям
       constructor(address _tom,address _ben,address _rick ){
        _mint(_tom, 10000*10**decimals());
        _mint(_ben, 10000*10**decimals());
        _mint(_rick, 130000*10**decimals());
    }
    // Возвращает кол-во знаков после запятой
    function decimals() public view virtual override returns(uint8){
        return 12;
    }
    // Цена
    function price() external pure  returns(uint){
        return 1500000 wei;
    }
    // Перевод вход( от кого, кому, кол-во)
    function transfer (address _from, address _to, uint _amount) external {
        _transfer(_from, _to, _amount);    
    }
}
contract RtkToken is ERC20("RTKCoin","RTK"){
        // Конструктор вход(адреса пользователей) эммиссия токена пользователям
       constructor(address _tom,address _ben,address _rick ){
        _mint(_tom, 10000*10**decimals());
        _mint(_ben, 10000*10**decimals());
        _mint(_rick, 280000*10**decimals());
    }
    // Возвращает кол-во знаков после запятой
    function decimals() public view virtual override returns(uint8){
        return 12;
    }
    // Цена
    function price() external pure  returns(uint){
        return 3000000 wei;
    }
    // Перевод вход(от кого, кому, кол-во)
    function transfer (address _from, address _to, uint _amount) external {
        _transfer(_from, _to, _amount);    
    }
}
