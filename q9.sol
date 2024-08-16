// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleLedger {
    struct Entry {
        string description;
        int256 amount;
    }

    Entry[] public entries;

    function addEntry(string memory description, int256 amount) public {
        entries.push(Entry(description, amount));
    }

    function getEntry(uint256 index) public view returns (string memory, int256)
    {
        Entry storage entry = entries[index];
        return (entry.description, entry.amount);
    }
}
