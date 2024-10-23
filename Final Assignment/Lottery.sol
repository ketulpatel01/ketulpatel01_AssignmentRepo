// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address payable[] public players;
    address payable public winner;
    bool public isComplete;
    bool public claimed;
    
    event WinnerPicked(address winner);
    
    constructor() {
        manager = msg.sender;
        isComplete = false;
        claimed = false;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function getManager() public view returns (address) {
        return manager;
    }

    function getWinner() public view returns (address) {
        return winner;
    }

    function status() public view returns (bool) {
        return isComplete;
    }
    
    function enter() public payable {
        require(msg.value >= 0.001 ether, "Minimum Ether not sent");
        require(!isComplete, "Lottery is already complete");
        players.push(payable(msg.sender));
    }
    
    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        require(!isComplete, "Lottery is already complete");
        
        winner = players[randomNumber() % players.length];
        isComplete = true;
        emit WinnerPicked(winner);
    }
    
    function claimPrize() public {
        require(msg.sender == winner, "You are not the winner");
        require(isComplete, "Lottery is not complete");
        require(!claimed, "Prize already claimed");

        claimed = true;
        (bool success, ) = winner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
    
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
    
    function randomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, players.length)));
    }
}
