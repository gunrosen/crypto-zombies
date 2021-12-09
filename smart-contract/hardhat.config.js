require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
const {utils} = require("ethers");
const {API_URL, OWNER_PRIVATE_KEY, USER_PRIVATE_KEY} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// task action function receives the Hardhat Runtime Environment as second argument
task(
    "blockNumber",
    "Prints the current block number",
    async (_, { ethers }) => {
      await hre.ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
      });
    }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    artifacts: '../frontend/src/artifacts',
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        accountsBalance: utils.parseEther("100").toString(),
      },
      gasPrice: 0,
      initialBaseFeePerGas: 0
    },
    ropsten: {
      url: API_URL,
      accounts: [`${OWNER_PRIVATE_KEY}`, `${USER_PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.4",
};
