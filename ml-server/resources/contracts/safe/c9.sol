pragma solidity ^0.8.0;

contract Lottery {
    address[] private players;
    uint256 private ticketPrice;
    uint256 private winner;
    
    constructor(uint256 _ticketPrice) {
        ticketPrice = _ticketPrice;
    }
    
    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Invalid ticket price");
        players.push(msg.sender);
    }
    
    function selectWinner() public {
        require(msg.sender == address(this), "Not the contract");
        require(players.length > 0, "No players");
        winner = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % players.length;
        payable(players[winner]).transfer(address(this).balance);
        players = new address[](0);
    }
}