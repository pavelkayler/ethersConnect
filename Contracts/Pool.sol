// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IToken.sol";

contract Pool{

    address owner;
    address tokenA;
    address tokenB;
    address lpToken;
    // Конструктор для создания пула вход( адрес 1-го токена,  адрес 2-го токена, кол-во 1-го токена, кол-во 2-го токена, адрес владелец пула, адрес lp-токена 
    constructor (address _tokenA, address _tokenB, uint _countTokenA, uint _countTokenB,address _owner,address _lpToken){
        owner = _owner;
        tokenA=_tokenA;
        tokenB=_tokenB;
        lpToken=_lpToken;
        IToken(_tokenA).transfer(msg.sender,address(this),_countTokenA);
        IToken(_tokenB).transfer(msg.sender,address(this),_countTokenB);
    }
    // Метод для обмена токенов вход(кол-во токенов. булевое значение для проверки какой токен вносится), Возвращает выбранный токен
    function swapToken(uint countToken, bool A)external {
        if(A){
            IToken(tokenB).transfer(address(this),msg.sender,(countToken * IToken(tokenB).balanceOf(address(this)) /
                    IToken(tokenA).balanceOf(address(this))));
            IToken(tokenA).transfer(msg.sender,address(this),countToken);
        }else{
            IToken(tokenA).transfer(address(this),msg.sender,(countToken*IToken(tokenA).balanceOf(address(this))
            /IToken(tokenB).balanceOf(address(this))));
            IToken(tokenB).transfer(msg.sender,address(this),countToken);
        }
    }
    // Мeтод для поддержки ликвидности вход(кол-во токенов. булевое значение для проверки какой токен вносится) возвращает путём эммиссии LP токены пользователю
    function supportLiquidity(uint countToken,bool A)external {
        if(A){
            IToken(lpToken).mint(msg.sender,countToken*IToken(tokenA).price()/IToken(lpToken).price());
            IToken(tokenA).transfer(msg.sender,address(this),countToken);
        }else{
            IToken(lpToken).mint(msg.sender,countToken*IToken(tokenB).price()/IToken(lpToken).price());
            IToken(tokenB).transfer(msg.sender,address(this),countToken);
        }
    }
    // Вывод информации о пуле
    function getPool()external view returns(
        address poolOwner,
        address poolAddres,
        string memory aSymbol,
        string memory bSymbol,
        uint countTokenA,
        uint countTokenB,
        uint tokenAWithPrice,
        uint tokenBWithPrice,
        uint allTokens

    ){
        return(
            owner,
            address(this),
            IToken(tokenA).symbol(),
            IToken(tokenB).symbol(),
            IToken(tokenA).balanceOf(address(this)),
            IToken(tokenB).balanceOf(address(this)),
            IToken(tokenA).balanceOf(address(this))*IToken(tokenA).price(),
            IToken(tokenB).balanceOf(address(this))*IToken(tokenB).price(),
            ((IToken(tokenA).balanceOf(address(this))*IToken(tokenA).price())+(IToken(tokenB).balanceOf(address(this))*IToken(tokenB).price()))
        );
    }

}