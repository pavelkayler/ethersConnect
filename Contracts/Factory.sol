// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IToken.sol";
import "./Pool.sol";

contract Factory{
    
    address [] poolAddress;
    address lpToken;
    address gerda;
    address krendel;
    address rtk;
    // Структура в которой хранятся данные о пуле
    struct PoolInfo{
        address poolOwner;
        address poolAddres;
        string  aSymbol;
        string  bSymbol;
        uint countTokenA;
        uint countTokenB;
        uint tokenAWithPrice;
        uint tokenBWithPrice;
        uint allTokens;
    }
    // Конструктор вход( адрес токена герда, адрес токена крендель, адрес токена ртк, адрес бена, адрес тома, адрес Lp - токена) создан для инициализации переменных, а так же для того чтобы контракт удовлетворял условиям ТЗ
    constructor(address _gerda,address _krendel,address _rtk, address _tom, address _ben, address _lpToken ){
        lpToken = _lpToken;
        gerda=_gerda;
        krendel=_krendel;
        rtk=_rtk;
        IToken(_gerda).transfer(msg.sender,address(this),1500*10**IToken(_gerda).decimals());
        IToken(_krendel).transfer(msg.sender,address(this),1000*10**IToken(_krendel).decimals());
        IToken(_krendel).transfer(msg.sender,address(this),2000*10**IToken(_krendel).decimals());
        IToken(_rtk).transfer(msg.sender,address(this),1000*10**IToken(_rtk).decimals());
        poolAddress.push(address(new Pool(_gerda,_krendel,1500*10**IToken(_gerda).decimals(),1000*10**IToken(_krendel).decimals(),_tom,_lpToken)));
        poolAddress.push(address(new Pool(_krendel,_rtk,2000*10**IToken(_krendel).decimals(),1000*10**IToken(_rtk).decimals(),_ben,_lpToken)));
        
    }
    /*
        Метод для создания пулов.
        Происходит перевод денежных средств с пользователя на адрес контракта после чего создаётся новый пул,
        и его адрес записывается в массив, для последующего вывода информации о нём.
        Вход:
            адрес первого токена,
            адрес второго токена,
            количество первого токена,
            количество второго токена
    */
    function createPool(address _tokenA, address _tokenB, uint _countTokenA, uint _countTokenB) external {
        IToken(_tokenA).transfer(msg.sender,address(this),_countTokenA);
        IToken(_tokenB).transfer(msg.sender,address(this),_countTokenB);
        poolAddress.push(address(new Pool(_tokenA,_tokenB,_countTokenA,_countTokenB,msg.sender,lpToken)));
    }
    // Возвращает баланс токенов у пользователя
    function getBalances()external view returns(
        uint gerdaBalance,
        uint krendelBalance,
        uint rtkBalance,
        uint lpBalance
    ) {
        return (
            IToken(gerda).balanceOf(msg.sender),
            IToken(krendel).balanceOf(msg.sender),
            IToken(rtk).balanceOf(msg.sender),
            IToken(lpToken).balanceOf(msg.sender)
        );

    }
    // Возвращает информацию о пуле
    function getPools()external view returns (PoolInfo [] memory) {
        PoolInfo [] memory poolInfoArray = new PoolInfo[](poolAddress.length);
        uint i = 0;
        while (i < poolAddress.length){
            Pool pool = Pool(poolAddress[i]);
               (
                address poolOwner,
                address poolAddres,
                string memory aSymbol,
                string memory bSymbol,
                uint countTokenA,
                uint countTokenB,
                uint tokenAWithPrice,
                uint tokenBWithPrice,
                uint allTokens
                ) = pool.getPool();
        PoolInfo memory pools = PoolInfo( 
                 poolOwner,
                 poolAddres,
                 aSymbol,
                 bSymbol,
                 countTokenA,
                 countTokenB,
                 tokenAWithPrice,
                 tokenBWithPrice,
                 allTokens);
                poolInfoArray[i] = (pools);
            i++;
        }
        return poolInfoArray;

    }
    
}