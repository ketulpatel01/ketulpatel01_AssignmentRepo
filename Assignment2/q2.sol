// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    int private storedData;

    function setMessage(int x) public {
        storedData = x;
    }

    function getMessage() public view returns (int) {
        return storedData;
    }
}
