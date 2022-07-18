import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const abi = fs.readFileSync(
	"./compiled/simpleStorage_sol_simpleStorage.abi",
	"utf8"
);
const binary = fs.readFileSync(
	"./compiled/simpleStorage_sol_simpleStorage.bin",
	"utf8"
);

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(process.env.ACCOUNT_1!, provider);

const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
const deployContract = async () => {
	const deployedContract = await contractFactory.deploy();
	console.log(deployedContract);
};

const deployedContract = deployContract();
