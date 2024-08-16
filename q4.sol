// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    int private count;

    function increment() public {
        count += 1;
    }

    function getCount() public view returns (int) {
        return count;
    }
}
