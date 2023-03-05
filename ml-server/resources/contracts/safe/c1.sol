pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) private balances;
    uint256 private totalSupply;
    
    constructor(uint256 _totalSupply) {
        balances[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }
}