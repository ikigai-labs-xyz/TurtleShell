from parseContract import parseContract
from nomalizer import normalizeContract

contract = "pragma solidity ^0.8.0; \n contract OverflowExample { \n uint256 public balance; \n function addToBalance(uint256 amount) public { \n balance += amount; \n} \n}"
tokens = parseContract(contract)
print(tokens)

normalized_tokens = normalizeContract(tokens)
print(normalized_tokens)