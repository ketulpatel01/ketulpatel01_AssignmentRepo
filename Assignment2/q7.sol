// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OwnerOnly {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function restrictedFunction() public onlyOwner {
        // Function logic
    }
}