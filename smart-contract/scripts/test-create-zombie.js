const hre = require("hardhat");
const {ethers} = require("ethers");
const {abi} = require('../artifacts/contracts/zombies/ZombieOwnership.sol/ZombieOwnership.json');

async function main() {
    const [user1, owner, user2, user3] = await hre.ethers.getSigners();
    console.log("Owner address", owner.address);
    console.log("User1 address", user1.address);

    // We get the contract from address
    const zombieOwnershipContract = new ethers.Contract('0xB199bf577BdDB0002Eeec24866b416bfD49bc6a4', abi, owner);
    const transaction = await zombieOwnershipContract.connect(owner).createRandomZombie("Hulk Zombie");

    console.log("Owner just generated a zombie with transaction:", transaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
