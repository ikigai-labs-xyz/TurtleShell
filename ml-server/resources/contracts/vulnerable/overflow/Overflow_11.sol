pragma solidity ^0.8.0;

contract TokenSale {
    mapping (address => uint256) public balances;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    
    function buyTokens(uint256 numTokens) public {
        uint256 cost = numTokens * tokenPrice;
        require(msg.value >= cost, "Insufficient funds");
        balances[msg.sender] += numTokens;
        tokensSold += numTokens;
    }
    
    function withdraw() public {
        uint256 balanceToSend = balances[msg.sender] * tokenPrice;
        require(address(this).balance >= balanceToSend, "Insufficient funds");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balanceToSend);
    }
}