//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ZombieFeeding.sol";

// @dev Helper will help change name if level is above
// and change DNA
// level up if user pay for it
contract ZombieHelper is ZombieFeeding{
    using SafeMath for uint256;

    uint levelUpFee = 0.001 ether;

    // @dev: some function need to above level
    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level);
        _;
    }

    function withdraw() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUp(uint _zombieId) external payable {
        require(msg.value == levelUpFee);
        zombies[_zombieId].level = zombies[_zombieId].level.add(1);
    }

    // @dev: Above level 2, owner can change name
    function changeName(uint _zombieId, string memory _newName) external aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].name = _newName;
    }

    // @dev: Above level 20, owner can change DNA
    function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerZombieCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
