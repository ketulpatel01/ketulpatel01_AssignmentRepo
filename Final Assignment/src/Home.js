import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import constants from './constants';

function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [contractInstance, setContractInstance] = useState(null);
    const [status, setStatus] = useState(false);
    const [isWinner, setIsWinner] = useState(false);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const address = accounts[0];
                    setCurrentAccount(address);
                    await loadContractData(address);
                } catch (error) {
                    console.error("User denied account access or error occurred: ", error);
                }

                window.ethereum.on('accountsChanged', async (accounts) => {
                    if (accounts.length > 0) {
                        const newAccount = accounts[0];
                        setCurrentAccount(newAccount);
                        await loadContractData(newAccount);
                    } else {
                        console.log("Please connect to MetaMask.");
                    }
                });
            } else {
                alert('Please install MetaMask to use this application');
            }
        };

        loadBlockchainData();
    }, []);

    const loadContractData = async (address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
        setContractInstance(contractIns);

        try {
            const isComplete = await contractIns.isComplete();
            setStatus(isComplete);
            
            // Fetch the winner address
            const winner = await contractIns.getWinner();
            console.log("Winner address:", winner);
            
            // Check if the current account is the winner
            setIsWinner(winner.toLowerCase() === address.toLowerCase()); // Normalize to lowercase for comparison
        } catch (error) {
            console.error("Error loading contract data: ", error);
        }
    };

    const enterLottery = async () => {
        if (contractInstance) {
            const amountToSend = ethers.utils.parseEther('0.001');
            try {
                const tx = await contractInstance.enter({ value: amountToSend });
                await tx.wait();
                await loadContractData(currentAccount); // Refresh data
                console.log("Successfully entered the lottery!");
            } catch (error) {
                console.error("Error entering lottery: ", error);
                alert('Error entering lottery: ' + error.message);
            }
        }
    };

    const claimPrize = async () => {
        if (contractInstance) {
            try {
                console.log("Attempting to claim prize...");
                const tx = await contractInstance.claimPrize();
                await tx.wait();
                console.log("Prize claimed successfully!");
                await loadContractData(currentAccount); // Refresh data
            } catch (error) {
                console.error("Error claiming prize: ", error);
                alert('Error claiming prize: ' + error.message);
            }
        }
    };

    const pickWinner = async () => {
        if (contractInstance) {
            try {
                const tx = await contractInstance.pickWinner();
                await tx.wait();
                console.log("Winner has been picked!");
                await loadContractData(currentAccount); // Refresh data after picking a winner
            } catch (error) {
                console.error("Error picking winner: ", error);
                alert('Error picking winner: ' + error.message);
            }
        }
    };

    return (
        <div className="container">
            <h1>Lottery Page</h1>
            <div className="button-container">
                {status ? (
                    isWinner ? 
                        (<button className="enter-button" onClick={claimPrize}>Claim Prize</button>) : 
                        (<p>You are not the winner</p>)
                ) : (
                    <button className="enter-button" onClick={enterLottery}>Enter Lottery</button>
                )}
            </div>
            {/* Optionally, add a button for the manager to pick a winner */}
            {currentAccount === constants.managerAddress && ( // Replace with the actual manager's address
                <button className="pick-winner-button" onClick={pickWinner}>Pick Winner</button>
            )}
        </div>
    );
}

export default Home;
