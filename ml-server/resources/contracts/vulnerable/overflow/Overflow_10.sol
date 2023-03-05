pragma solidity ^0.7.0;

contract GiftCard {
    mapping (address => uint256) public balances;
    uint256 public giftCardValue;
    
    function buyGiftCard() public payable {
        require(msg.value == giftCardValue, "Incorrect amount");
        balances[msg.sender] += giftCardValue;
    }
    
    function redeem() public {
        uint256 balanceToRedeem = balances[msg.sender];
        require(balanceToRedeem <= address(this).balance, "Insufficient funds");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balanceToRedeem);
    }
}