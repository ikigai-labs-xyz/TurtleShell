pragma solidity ^0.7.0;

contract Auction {
    address public highestBidder;
    uint256 public highestBid;
    
    function bid() public payable {
        require(msg.value > highestBid, "Bid too low");
        highestBidder.transfer(highestBid); // integer overflow here
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}