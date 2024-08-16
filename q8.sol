// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventLogger {
    event LogEvent(string message, address user);

    function logSomething(string memory message) public {
        emit LogEvent(message, msg.sender);
    }
}
