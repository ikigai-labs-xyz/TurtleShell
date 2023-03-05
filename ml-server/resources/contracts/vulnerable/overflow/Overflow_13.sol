pragma solidity ^0.8.0;

contract TokenSwap {
    mapping (address => uint256) public balances;
    uint256 public tokenPrice;
    
    function swap(uint256 numTokens) public {
        require(balances[msg.sender] >= numTokens, "Insufficient tokens");
        balances[msg.sender] -= numTokens;
        uint256 cost = numTokens * tokenPrice;
        balances[address(this)] += numTokens;
        balances[msg.sender] -= cost; // integer overflow here
        balances[address(this)] += cost;
    }
}