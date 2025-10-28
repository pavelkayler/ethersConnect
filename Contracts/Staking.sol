// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IToken.sol";
contract Staking{
    address lpToken;
    // Структура хранящая в себе перменные нужные для вывода информации о стейкинге
    struct User{
        uint lastReardTime;
        uint countLp;
        uint reward;
    }
    constructor (address _lpToken){
        lpToken = _lpToken;
    }

    mapping (address => User) userInfo;
    // Отправление токена на контракт вход(кол-во, адрес токена)
    function pushToContract (uint countToken ) external {
        IToken(lpToken).transfer(msg.sender,address(this),countToken);
        userInfo[msg.sender].countLp += countToken;
        userInfo[msg.sender].lastReardTime = block.timestamp;
    }
    // Получение награды
    function getReward () external {
        IToken(lpToken).mint(msg.sender,
        (
            userInfo[msg.sender].countLp*(block.timestamp-userInfo[msg.sender].lastReardTime)
            /1_576_800*(userInfo[msg.sender].countLp/IToken(lpToken).balanceOf(address(this))+1)
            *((((block.timestamp-userInfo[msg.sender].lastReardTime)/30 days)/20)+1)
        ));
        userInfo[msg.sender].reward -userInfo[msg.sender].reward;
        
    
    } 
    function viewReward () external {
        userInfo[msg.sender].reward = (
        userInfo[msg.sender].countLp*(block.timestamp-userInfo[msg.sender].lastReardTime)
        /1_576_800*(userInfo[msg.sender].countLp/IToken(lpToken).balanceOf(address(this))+1)
        *((((block.timestamp-userInfo[msg.sender].lastReardTime)/30 days)/20)+1)
        );
    }
    // Вывод информации о стейкинге
    function getInfoStaking () external view returns (
        uint lastReardTime,
        uint countLp,
        uint reward
    ) {
        return (
            userInfo[msg.sender].lastReardTime,
            userInfo[msg.sender].countLp,
            userInfo[msg.sender].reward
        );

    } 
}