var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {ethers, waffle} = require("hardhat");

describe("ZombieOwnership - minter mint zombie", async () => {
    let owner, user1, minter, user3;
    let zombieOwnershipContract;

    beforeEach(async () => {
        [owner, user1, minter, user3] = await ethers.getSigners();
        const ZombieOwnershipFactory = await ethers.getContractFactory("ZombieOwnership");
        zombieOwnershipContract = await ZombieOwnershipFactory.deploy(minter.address);
        await zombieOwnershipContract.deployed();
    })

    it("is deployed", async () => {
        expect(await zombieOwnershipContract.deployed()).to.equal(zombieOwnershipContract);
        expect(await zombieOwnershipContract.name()).to.equal("Hulk NFT Zombie");
        expect(await zombieOwnershipContract.symbol()).to.equal('H-NFT');
        expect(await zombieOwnershipContract.countZombie()).to.equal(0);
    });

    it("minter can create a zombie nft", async () => {
        await zombieOwnershipContract.connect(minter).createRandomZombie("test");
        expect(await zombieOwnershipContract.countZombie()).to.equal(1);
        const listNFT = await zombieOwnershipContract.getZombiesByOwner(minter.address);
        expect(listNFT.length).to.equal(1);
        expect(await zombieOwnershipContract.balanceOf(minter.address)).to.equal(1);
    })

    it("minter can create many zombie nft", async () => {
        await zombieOwnershipContract.connect(minter).createRandomZombie("test");
        await zombieOwnershipContract.connect(minter).createRandomZombie("test1");
        expect(await zombieOwnershipContract.countZombie()).to.equal(2);
        const listNFT = await zombieOwnershipContract.getZombiesByOwner(minter.address);
        expect(listNFT.length).to.equal(2);
        expect(await zombieOwnershipContract.balanceOf(minter.address)).to.equal(2);
    })

    it("minter give user1 a zombie when user1 does not have any zombie", async () => {
        await zombieOwnershipContract.connect(minter).createRandomZombie("test");
        expect(await zombieOwnershipContract.countZombie()).to.equal(1);
        await zombieOwnershipContract.connect(minter).mintZombieToPlayer(user1.address, "test2");
        expect(await zombieOwnershipContract.countZombie()).to.equal(2);
        expect(await zombieOwnershipContract.balanceOf(user1.address)).to.equal(1);
    })

    it("minter give user1 a zombie when user1 have a zombie", async () => {
        await zombieOwnershipContract.connect(minter).createRandomZombie("test");
        await zombieOwnershipContract.connect(user1).createRandomZombie("test1");
        expect(await zombieOwnershipContract.countZombie()).to.equal(2);
        await zombieOwnershipContract.connect(minter).mintZombieToPlayer(user1.address, "test2");
        expect(await zombieOwnershipContract.countZombie()).to.equal(3);
        expect(await zombieOwnershipContract.balanceOf(user1.address)).to.equal(2);
    })

});