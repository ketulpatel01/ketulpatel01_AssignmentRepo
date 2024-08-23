// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

contract Greeting {
    mapping(address => string) private greetings;

    function setGreeting(string memory _greeting) public {
        greetings[msg.sender] = _greeting;
    }

    function getGreeting() public view returns (string memory) {
        return greetings[msg.sender];
    }
}