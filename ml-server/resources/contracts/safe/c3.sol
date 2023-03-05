pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    uint256 public balance;
    
    constructor(address _buyer, address _seller) payable {
        require(msg.value > 0, "No funds sent");
        buyer = _buyer;
        seller = _seller;
        balance = msg.value;
    }
    
    function release() public {
        require(msg.sender == buyer, "Not the buyer");
        seller.transfer(balance);
        balance = 0;
    }
    
    function refund() public {
        require(msg.sender == seller, "Not the seller");
        buyer.transfer(balance);
        balance = 0;
    }
}