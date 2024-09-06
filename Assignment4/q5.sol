// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {

    struct Donation {
        uint amount;
        uint timestamp;
    }

    mapping(address => Donation[]) private donations;

    event DonationMade(address indexed donor, address indexed recipient, uint amount, uint timestamp);

    function donate(address payable recipient) public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        recipient.transfer(msg.value);

        donations[msg.sender].push(Donation({
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit DonationMade(msg.sender, recipient, msg.value, block.timestamp);
    }

    function getDonationHistory() public view returns (Donation[] memory) {
        return donations[msg.sender];
    }

    function getTotalDonations() public view returns (uint) {
        uint total = 0;
        Donation[] memory donorDonations = donations[msg.sender];
        for (uint i = 0; i < donorDonations.length; i++) {
            total += donorDonations[i].amount;
        }
        return total;
    }
}
