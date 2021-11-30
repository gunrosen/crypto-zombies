//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ZombieAttack.sol";

contract ZombieOwnership is ZombieAttack, ERC721URIStorage {
    using SafeMath for uint256;

    string public uri;
    mapping (uint => address) zombieApprovals;

    constructor() ERC721("Hulk NFT", "H-NFT") {

    }

    function mintItem(address player, string memory tokenURI)
    public
    returns (uint256)
    {
        uint256 newItemId = zombies.length + 1;
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function balanceOf(address _owner) public override view returns (uint256) {
        return ownerZombieCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public override  view returns (address) {
        return zombieToOwner[_tokenId];
    }

    // @dev: transfer token
    function _transfer(address _from, address _to, uint256 _tokenId) override internal{
        ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].sub(1);
        zombieToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        require (zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender);
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
        zombieApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
}
