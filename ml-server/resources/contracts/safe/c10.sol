pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) private hasVoted;
    uint256 private option1Votes;
    uint256 private option2Votes;
    
    function vote(bool _option) public {
        require(!hasVoted[msg.sender], "Already voted");
        if (_option) {
            option1Votes++;
        } else {
            option2Votes++;
        }
        hasVoted[msg.sender] = true;
    }
    
    function getResults() public view returns (uint256, uint256) {
        return (option1Votes, option2Votes);
    }
}