pragma solidity ^0.7.0;

contract DivisionOverflow {
    uint256 public result;
    
    function divide(uint256 numerator, uint256 denominator) public {
        result = numerator / denominator;
    }
}