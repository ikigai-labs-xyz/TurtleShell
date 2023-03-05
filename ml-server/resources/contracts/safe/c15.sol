pragma solidity ^0.8.0;

contract PaymentSplitting {
    address[] private recipients;
    mapping(address => uint256) private shares;
    
    constructor(address[] memory _recipients, uint256[] memory _shares) {
        require(_recipients.length == _shares.length, "Arrays length mismatch");
        recipients = _recipients;
        uint256 totalShares;
        for (uint256 i = 0; i < _recipients.length; i++) {
            totalShares += _shares[i];
        }
        require(totalShares == 100, "Invalid shares total");
        for (uint256 i = 0; i < _recipients.length; i++) {
            shares[_recipients[i]] = _shares[i];
        }
    }
    
    function distribute() public payable {
        uint256 total = msg.value;
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 share = shares[recipient];
            uint256 amount = (total * share) / 100;
            payable(recipient).transfer(amount);
            total -= amount;
        }
    }
}