pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) private hasVoted;
    uint256 private yesVotes;
    uint256 private noVotes;
    
    function vote(bool _choice) public {
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        if (_choice) {
            yesVotes++;
        } else {
            noVotes++;
        }
    }
    
    function getResult() public view returns (bool) {
        require(hasVoted[msg.sender], "Not voted yet");
        return yesVotes > noVotes;
    }
}