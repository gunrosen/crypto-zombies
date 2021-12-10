//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// @dev: a Factory, which define some rules:
// 1. Struct of a Zombie, create random zombie base on name
// 2. Zombie owner: each owner can generate new exactly one zombie,
contract ZombieFactory is Ownable {
    using SafeMath for uint256;

    event NewZombie(uint zombieId, address indexed owner, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 minutes;

    struct Zombie {
        string name;
        uint256 dna;
        uint256 level;
        uint256 readyTime;
        uint256 winCount;
        uint256 lossCount;
    }

    Zombie[] public zombies;

    mapping(uint => address) public zombieToOwner;
    mapping(address => uint) ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) internal {
        zombies.push(Zombie(_name, _dna, 1, uint(block.timestamp + cooldownTime), 0, 0));
        uint id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);
        emit NewZombie(id, msg.sender, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    // @dev: user can create only one zombie except owner
    function createRandomZombie(string memory _name) public returns (uint){
        require(ownerZombieCount[msg.sender] == 0 || owner() == msg.sender, "ZombieFactory: You already have zombie.");
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createZombie(_name, randDna);
        uint id = zombies.length - 1;
        return id;
    }

    function countZombie() public view returns (uint) {
        uint x = zombies.length;
        return x;
    }

    function updateCoolDownTime(uint _updateCooldownTime) public onlyOwner returns (uint) {
        cooldownTime = _updateCooldownTime;
        return _updateCooldownTime;
    }

    function getCoolDownTime() public view returns (uint) {
        return cooldownTime;
    }
}
