pragma solidity ^0.8.0;

contract Investment {
    uint256 public balance;
    mapping (address => uint256) public investments;
    
    function invest() public payable {
        balance += msg.value;
        investments[msg.sender] += msg.value;
    }
    
    function withdraw() public {
        uint256 investment = investments[msg.sender];
        require(investment > 0, "No investment found");
        require(address(this).balance >= investment, "Insufficient funds");
        investments[msg.sender] = 0;
        payable(msg.sender).transfer(investment);
    }
}