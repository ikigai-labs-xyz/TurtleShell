pragma solidity ^0.7.0;

contract Betting {
    uint256 public balance;
    
    function bet(uint256 amount) public {
        if (amount > balance) {
            revert("Insufficient funds");
        }
        
        balance -= amount;
        // do some betting logic here
        balance += amount * 2;
    }
}