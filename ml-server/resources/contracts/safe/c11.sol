pragma solidity ^0.8.0;

contract Escrow {
    address private buyer;
    address private seller;
    address private arbiter;
    uint256 private amount;
    
    constructor(address _buyer, address _seller, address _arbiter, uint256 _amount) {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        amount = _amount;
    }
    
    function release() public {
        require(msg.sender == arbiter, "Not the arbiter");
        payable(seller).transfer(amount);
    }
    
    function refund() public {
        require(msg.sender == arbiter, "Not the arbiter");
        payable(buyer).transfer(amount);
    }
}