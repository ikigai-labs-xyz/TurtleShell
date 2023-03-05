pragma solidity ^0.8.0;

contract VotingWithWeights {
    mapping (address => uint256) public weights;
    mapping (address => bool) public hasVoted;
    uint256 public totalVotes;
    
    function addVoter(address voter, uint256 weight) public {
        weights[voter] = weight;
    }
    
    function vote() public {
        require(weights[msg.sender] > 0, "Not a registered voter");
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        totalVotes += weights[msg.sender];
    }
}