import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import constants from './constants';

function PickWinner() {
    const [contractInstance, setContractInstance] = useState(null);
    const [currentAccount, setCurrentAccount] = useState('');
    const [isOwnerConnected, setIsOwnerConnected] = useState(false);
    const [winner, setWinner] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setCurrentAccount(address);

                    const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
                    setContractInstance(contractIns);

                    const isComplete = await contractIns.isComplete();
                    setStatus(isComplete);
                    const currentWinner = await contractIns.getWinner();
                    setWinner(currentWinner);
                    const owner = await contractIns.getManager();
                    setIsOwnerConnected(owner.toLowerCase() === address.toLowerCase());

                    window.ethereum.on('accountsChanged', (accounts) => {
                        setCurrentAccount(accounts[0]);
                    });

                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    alert('Error loading blockchain data');
                    setLoading(false);
                }
            } else {
                alert('Please install Metamask to use this application');
                setLoading(false);
            }
        };

        loadBlockchainData();
    }, []);

    const pickWinner = async () => {
        if (!contractInstance) return;
        try {
            const tx = await contractInstance.pickWinner();
            await tx.wait();

            const newWinner = await contractInstance.getWinner();
            console.log(`New winner: ${newWinner}`); // Debug log winner
            setWinner(newWinner);
            setStatus(true);
        } catch (err) {
            console.error(err);
            alert('Error picking the winner');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>Result Page</h1>
            <div className='button-container'>
                {status ? (
                    <p>Lottery Winner is: {winner}</p>
                ) : (
                    isOwnerConnected ? (
                        <button className="enter-button" onClick={pickWinner}>Pick Winner</button>
                    ) : (
                        <p>You are not the owner</p>
                    )
                )}
            </div>
        </div>
    );
}

export default PickWinner;