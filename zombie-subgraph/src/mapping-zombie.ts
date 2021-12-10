import {Address, BigInt} from "@graphprotocol/graph-ts"
import {
    ZombieOwnership,
    Approval,
    ApprovalForAll,
    NewZombie,
    OwnershipTransferred,
    Transfer
} from "../generated/ZombieOwnership/ZombieOwnership"
import {User, Zombie} from "../generated/schema"

const toStringId = (id: BigInt) : string => id.toString();
const toStringAddress = (address: Address) : string => address.toString();

export function handleApproval(event: Approval): void {

}

export function handleApprovalForAll(event: ApprovalForAll): void {
}

export function handleNewZombie(event: NewZombie): void {
    const zombieStringId = toStringId(event.params.zombieId);
    const ownerStringAddress = toStringAddress(event.params.owner);
    let zombie = new Zombie(zombieStringId);
    zombie.name = event.params.name;
    zombie.owner = ownerStringAddress;
    zombie.dna = event.params.dna;
    zombie.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {

}

export function handleTransfer(event: Transfer): void {
  const tokenStringId = toStringId(event.params.tokenId);
  const ownerStringAddress = toStringAddress(event.params.to);
  let zombie = Zombie.load(tokenStringId);
  if (zombie){
      zombie.owner =  ownerStringAddress;
      zombie.save();
  }
}
