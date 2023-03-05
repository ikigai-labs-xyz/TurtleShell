pragma solidity ^0.8.0;

contract TimeLock {
    address private owner;
    uint256 private releaseTime;
    
    constructor(uint256 _releaseTime) {
        owner = msg.sender;
        releaseTime = _releaseTime;
    }
    
    function release() public {
        require(msg.sender == owner, "Not the owner");
        require(block.timestamp >= releaseTime, "Not yet released");
        selfdestruct(payable(owner));
    }
}