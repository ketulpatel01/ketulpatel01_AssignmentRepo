# 🎲 Ethereum Lottery DApp

### This decentralized application (DApp) allows users to participate in a lottery on the Ethereum blockchain. Participants send Ether to enter the lottery, and the contract manager picks a winner at random. The winner can then claim the prize.

# Admin Features:
### Pick Winner: The contract manager can randomly select a winner from the list of participants.
### View Participants: Admin can view the list of participants who have entered the lottery.

# User Features:
### Enter Lottery: Users can send 0.001 Ether to participate in the lottery.
### Claim Prize: If selected, the winner can claim their prize.
### MetaMask Integration: Users can connect their MetaMask wallet to securely interact with the blockchain.

## ⚙️ Project Setup

### Prerequisites:
- **Node.js** (v14 or later)
- **MetaMask**: Browser extension for interacting with Ethereum.
- **Ethereum Testnet**: You can use testnets like Ropsten or Goerli for development and testing.

### Installation Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ketulpatel01/ketulpatel01_AssignmentRepo/tree/main/Final%20Assignment
   cd ethereum-lottery-dapp
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure it as follows:
   ```bash
   API_URL=https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID
   PRIVATE_KEY=your_private_key_here
   CONTRACT_ADDRESS=deployed_contract_address_here
   ```

🛠️ **Usage**

### Running the App:
1. To deploy the contract on an Ethereum testnet, run:
   ```bash
   npx hardhat run scripts/deploy.js --network goerli
   ```

2. Once deployed, update `constants.js` with the contract's ABI and address.

3. Start the frontend:
   ```bash
   npm start
   ```

## Features

- **Lottery Entry**: Users can enter the lottery by sending Ether.
- **Prize Claiming**: Winners can claim their prize after the manager selects them.
- **Blockchain Transparency**: All interactions are stored on the Ethereum blockchain for verifiability.

## Deployment

This DApp can be deployed on any Ethereum-compatible testnet, such as Goerli or Ropsten. Make sure to update the smart contract address and network details when deploying.

