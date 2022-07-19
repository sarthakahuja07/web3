import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: process.env.RINKEBY_RPC_URL,
			chainId: 4,
			accounts: [process.env.ACCOUNT_1!]
		}
	}
};

export default config;
