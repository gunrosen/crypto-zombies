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
        await zombieFactory.connect(user).createRandomZombie("test");
        expect(zombieFactory.connect(user).createRandomZombie("test2")).to.be.rejectedWith(Error);
    });

    it("Owner can create many zombie", async () => {
        await zombieFactory.connect(owner).createRandomZombie("test");
        await zombieFactory.connect(owner).createRandomZombie("test1");
        await zombieFactory.connect(owner).createRandomZombie("test2");
        expect(await zombieFactory.countZombie()).to.equal(3);
    })

    it("Owner can change cooldown time", async () => {
        await zombieFactory.connect(owner).updateCoolDownTime(60);
    })
    it("User can not change cooldown time", async () => {
        expect(zombieFactory.connect(user).updateCoolDownTime(60)).revertedWith(Error);
    })
});
