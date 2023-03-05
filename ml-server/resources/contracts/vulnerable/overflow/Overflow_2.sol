pragma solidity ^0.7.0;

contract Token {
    mapping (address => uint256) public balanceOf;
    
    function transfer(address to, uint256 value) public {
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
    }
}