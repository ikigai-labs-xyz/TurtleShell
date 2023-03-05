pragma solidity ^0.8.0;

contract TokenVesting {
    address private owner;
    address private beneficiary;
    uint256 private startDate;
    uint256 private duration;
    uint256 private cliff;
    uint256 private released;
    bool private revocable;
    bool private revoked;
    mapping(address => uint256) private balances;
    
    constructor(address _beneficiary, uint256 _startDate, uint256 _duration, uint256 _cliff, bool _revocable) {
        owner = msg.sender;
        beneficiary = _beneficiary;
        startDate = _startDate;
        duration = _duration;
        cliff = _cliff;
        revocable = _revocable;
    }
    
    function balanceOf(address _account) public view returns (uint256) {
        return balances[_account];
    }
    
    function release() public {
        require(msg.sender == beneficiary, "Not the beneficiary");
        require(now >= startDate + cliff, "Cliff period not over");
        uint256 vested = calculateVestedAmount();
        uint256 amount = vested - released;
        require(amount > 0, "No tokens to release");
        released += amount;
        balances[beneficiary] += amount;
    }
    
    function revoke() public {
        require(msg.sender == owner, "Not the owner");
        require(revocable, "Not revocable");
        require(!revoked, "Already revoked");
        uint256 vested = calculateVestedAmount();
        uint256 amount = vested - released;
        require(amount > 0, "No tokens to revoke");
        balances[beneficiary] -= amount;
        balances[owner] += amount;
        revoked = true;
    }
    
    function calculateVestedAmount() private view returns (uint256) {
        uint256 elapsed = now - startDate;
        if (elapsed < cliff) {
            return 0;
        }
        uint256 vested = (duration * (elapsed - cliff)) / duration;
        return vested;
    }
}