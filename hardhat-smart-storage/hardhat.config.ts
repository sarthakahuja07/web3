import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/block-number";
import "./tasks/accounts";
import "hardhat-gas-reporter";
require("dotenv").config();

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: process.env.RINKEBY_RPC_URL,
			chainId: 4,
			accounts: [process.env.ACCOUNT_1!]
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			chainId: 31337
		}
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY
	},
	gasReporter: {
		enabled: true,
		currency: "INR",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token:'MATIC'
	}
};

export default config;
