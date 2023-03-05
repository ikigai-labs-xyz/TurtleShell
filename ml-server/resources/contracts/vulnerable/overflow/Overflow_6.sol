contract Lottery {
    uint256 public balance;
    uint256 public ticketPrice;
    mapping (address => uint256) public tickets;
    
    function buyTicket() public {
        require(msg.value >= ticketPrice, "Insufficient funds");
        balance += msg.value;
        tickets[msg.sender] += msg.value / ticketPrice;
    }
    
    function payOutWinner(address winner) public {
        uint256 winnings = tickets[winner] * ticketPrice;
        require(winnings <= balance, "Insufficient funds");
        balance -= winnings;
        payable(winner).transfer(winnings);
    }
}