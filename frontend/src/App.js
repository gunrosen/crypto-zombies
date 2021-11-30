import {useState} from 'react';
import './App.css';
import ZombieOwnerShipContract from "./artifacts/contracts/ZombieOwnership.sol/ZombieOwnership.json";
import {ethers} from "ethers";

const ZOMBIE_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);
    const [currentAccount, setCurrentAccount] = useState({address: '', balanceETH: 0});
    const [errorMessage, setErrorMessage] = useState('');
    const [zombieName, setZombieName] = useState('');

    const handleConnectWallet = async () => {
        if (!window.ethereum) {
            setErrorMessage('ethereum wallet is not available');
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await window.ethereum.request({method: 'eth_requestAccounts'});
        const _signer = provider.getSigner();
        const userAddress = await _signer.getAddress();
        console.log("Connected to wallet address: ",userAddress);
        const balance = await provider.getBalance(userAddress);
        const ethFormat = ethers.utils.formatEther(balance)
        setCurrentAccount({address: userAddress, balanceETH: ethFormat});
        setSigner(_signer);
        setProvider(provider);
    };

    const createNewZombie = async (e) => {
        e.preventDefault();
        console.log("createNewZombie", zombieName);
        const zombieOwnerShipContract = new ethers.Contract(ZOMBIE_CONTRACT_ADDRESS, ZombieOwnerShipContract.abi, signer);
        await zombieOwnerShipContract.createRandomZombie(zombieName);
    };

    const getZombies = async (e) => {
        e.preventDefault();
        const zombieOwnerShipContract = new ethers.Contract(ZOMBIE_CONTRACT_ADDRESS, ZombieOwnerShipContract.abi, signer);
        const address = await signer.getAddress();
        console.log("Get zombie of address:", address);
        const zombies = await zombieOwnerShipContract.getZombiesByOwner(address);
        console.log("zombies:", zombies);
    }

    const handleChangeZombieName = (e) => {
        e.preventDefault();
        setZombieName(e.target.value);
    }

    return (
        <div className="app-container">
            <div>
                {currentAccount.address}
            </div>
            <div>
                {currentAccount.balanceETH}
            </div>
            <div>
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            </div>
            <div>
                <button onClick={getZombies}>Get zombies</button>
            </div>
            <div>
                <input type="text" value={zombieName} onChange={handleChangeZombieName}/>
                <button onClick={createNewZombie}>Create New Zombie</button>
            </div>

            <div>
                {errorMessage ?
                    <label style={{color: 'red'}}> {errorMessage}</label> : ''}
            </div>
        </div>

    );
};

export default App;
