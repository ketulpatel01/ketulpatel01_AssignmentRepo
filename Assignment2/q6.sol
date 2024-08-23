// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => int) public votes;
    string[] public candidates;

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function vote(string memory _candidate) public {
        require(voteExists(_candidate), "Candidate does not exist");
        votes[_candidate] += 1;
    }

    function voteExists(string memory _candidate) private view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i])) ==
                keccak256(abi.encodePacked(_candidate))
            ) {
                return true;
            }
        }
        return false;
    }
}
