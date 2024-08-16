// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

contract NameStorage {
    string private storedData;

    function setName(string memory name) public {
        storedData = name;
    }

    function getName() public view returns (string memory) {
        return storedData;
    }   
}