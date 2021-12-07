//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./ZombieFactory.sol";

interface KittyInterface {
    function getKitty(uint256 _id) external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

// @dev: Feature to eating things. Currently, zombie can eat kitty
// Game rule: zombie eat and multiply if cooldown time over
// Can eat kitty and multiply
contract ZombieFeeding is ZombieFactory {
    KittyInterface kittyContract;

    modifier onlyOwnerOf(uint _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId], "ZombieFeeding: owner is required.");
        _;
    }

    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    //@dev: Trigger after fighting
    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(block.timestamp + cooldownTime);
    }

    function _isReady(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTime <= block.timestamp);
    }

    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId];
        require(_isReady(myZombie), "ZombieFeeding: Zombie not ready to feed");
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;
        // Compare string: _species to kitty
        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }
        _createZombie("Unnamed", newDna);
        _triggerCooldown(myZombie);
    }

    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");
    }
}
