pragma solidity ^0.8.0;

contract Token {
    address private owner;
    mapping(address => uint256) private balances;
    
    constructor() {
        owner = msg.sender;
    }
    
    function mint(address _to, uint256 _amount) public {
        require(msg.sender == owner, "Not the owner");
        balances[_to] += _amount;
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}