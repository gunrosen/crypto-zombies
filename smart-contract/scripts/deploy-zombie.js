const hre = require("hardhat");
const {ethers} = require("ethers");

async function main() {
    const [owner, user1, minter, user3] = await hre.ethers.getSigners();
    console.log("Owner address", owner.address);
    console.log("User address", user1.address);
    console.log("Minter address", minter.address);

    // We get the contract to deploy
    const ZombieOwnership = await hre.ethers.getContractFactory("ZombieOwnership");
    const zombieOwnershipContract = await ZombieOwnership.deploy(minter.address);
    await zombieOwnershipContract.deployed();

    console.log("ZombieOwnership contract deployed to:", zombieOwnershipContract.address);

    // owner generate 3 zombies
    for (let i=0; i < 3; i++){
        await zombieOwnershipContract.createRandomZombie("Zombie "+ i);
    }
    console.log("Owner generated 3 zombies for him. He is rich");

    // owner give user1 2 zombies
    await zombieOwnershipContract.mintZombieToPlayer(user1.address, "Gift 1 for user 1");
    await zombieOwnershipContract.mintZombieToPlayer(user1.address, "Gift 2 for user 1");
    console.log("Owner gave away 2 zombies for user1. Owner is generous");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
