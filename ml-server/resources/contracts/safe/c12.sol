pragma solidity ^0.8.0;

contract Donation {
    address private owner;
    uint256 private goal;
    uint256 private amount;
    
    constructor(uint256 _goal) {
        owner = msg.sender;
        goal = _goal;
    }
    
    function donate() public payable {
        require(msg.sender != owner, "Owner cannot donate");
        amount += msg.value;
        if (amount >= goal) {
            payable(owner).transfer(amount);
            amount = 0;
        }
    }
}