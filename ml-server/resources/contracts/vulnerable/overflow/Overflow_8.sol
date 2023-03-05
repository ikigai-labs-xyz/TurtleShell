pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    uint256 public balance;
    
    function deposit() public payable {
        require(msg.sender == buyer, "Not the buyer");
        balance += msg.value;
    }
    
    function release() public {
        require(msg.sender == buyer, "Not the buyer");
        require(balance > 0, "No funds to release");
        seller.transfer(balance); // integer overflow here
        balance = 0;
    }
}