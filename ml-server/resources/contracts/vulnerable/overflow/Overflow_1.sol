pragma solidity ^0.7.0;

contract OverflowExample {
    uint256 public balance;
    
    function addToBalance(uint256 amount) public {
        balance += amount;
    }
}