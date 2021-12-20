const hre = require("hardhat");
const {ethers} = require("ethers");
const {abi} = require('../artifacts/contracts/zombies/ZombieOwnership.sol/ZombieOwnership.json');

async function main() {
    const [owner, user1, user2, user3] = await hre.ethers.getSigners();
    console.log("Owner address", owner.address);
    console.log("User1 address", user1.address);

    // We get the contract from address
    const zombieOwnershipContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', abi, owner);
    const transaction = await zombieOwnershipContract.connect(owner).mintZombieToPlayer(user1.address, "New zombie");

    console.log("Owner just mint a zombie for user with transaction:", transaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
