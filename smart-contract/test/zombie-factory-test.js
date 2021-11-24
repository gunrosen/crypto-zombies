var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {ethers, waffle} = require("hardhat");

describe("ZombieFactory", async () => {
    let owner;
    let user;
    let zombieFactory;
    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();
        const ZombieFactory = await ethers.getContractFactory("ZombieFactory");
        zombieFactory = await ZombieFactory.deploy();
        await zombieFactory.deployed();
    })

    it("is deployed", async () => {
        expect(await zombieFactory.deployed()).to.equal(zombieFactory);
    });

    it("User create new zombie", async () => {
        await zombieFactory.createRandomZombie("test");
        const number = await zombieFactory.countZombie();
        expect(number).to.equal(1);
    });

    it("User can not create more than one zombie", async () => {
        await zombieFactory.createRandomZombie("test");
        expect(zombieFactory.createRandomZombie("test2")).to.be.rejectedWith(Error);
    });
});
