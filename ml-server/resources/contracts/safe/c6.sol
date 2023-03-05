pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] private owners;
    uint256 private requiredSignatures;
    mapping(address => bool) private isOwner;
    mapping(uint256 => mapping(address => bool)) private hasSigned;
    uint256 private nonce;
    
    constructor(address[] memory _owners, uint256 _requiredSignatures) {
        require(_owners.length > 0, "No owners");
        require(_requiredSignatures <= _owners.length, "Invalid number of required signatures");
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner address");
            require(!isOwner[owner], "Duplicate owner");
            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredSignatures = _requiredSignatures;
    }
    
    function submitTransaction(address payable _to, uint256 _value, bytes memory _data) public returns (uint256) {
        require(isOwner[msg.sender], "Not an owner");
        nonce++;
        uint256 transactionId = uint256(keccak256(abi.encodePacked(nonce, _to, _value, _data)));
        for (uint256 i = 0; i < owners.length; i++) {
            hasSigned[transactionId][owners[i]] = false;
        }
        hasSigned[transactionId][msg.sender]