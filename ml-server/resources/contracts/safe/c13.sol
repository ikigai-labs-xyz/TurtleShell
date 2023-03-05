pragma solidity ^0.8.0;

contract CrowdFunding {
    address private owner;
    uint256 private goal;
    uint256 private amount;
    mapping(address => uint256) private pledges;
    
    constructor(uint256 _goal) {
        owner = msg.sender;
        goal = _goal;
    }
    
    function pledge() public payable {
        require(msg.sender != owner, "Owner cannot pledge");
        amount += msg.value;
        pledges[msg.sender] += msg.value;
    }
    
    function withdraw() public {
        require(msg.sender == owner, "Not the owner");
        require(amount >= goal, "Goal not reached");
        payable(owner).transfer(amount);
        amount = 0;
    }
    
    function refund() public {
        require(msg.sender != owner, "Owner cannot refund");
        require(amount < goal, "Goal reached");
        uint256 pledgeAmount = pledges[msg.sender];
        require(pledgeAmount > 0, "No pledge");
        payable(msg.sender).transfer(pledgeAmount);
        pledges[msg.sender] = 0;
        amount -= pledgeAmount;
    }
}