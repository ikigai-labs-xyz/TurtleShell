pragma solidity ^0.8.0;

contract Voting {
    mapping (address => uint256) public votes;
    uint256 public totalVotes;
    
    function vote() public {
        votes[msg.sender] += 1;
        totalVotes += 1;
    }
}