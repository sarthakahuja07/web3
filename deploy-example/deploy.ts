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

const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_RPC);
const wallet = new ethers.Wallet(process.env.ACCOUNT_1!, provider);

const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
const main = async () => {
	const deployedContract = await contractFactory.deploy();
	// console.log(deployedContract.deployTransaction);
	var currData = await deployedContract.getData();
	console.log("curr data", currData.toString());

	const transactionResponse = await deployedContract.setData(10);
	let transactionReceipt = await transactionResponse.wait();

	console.log("transaction receipt: ", transactionReceipt);

	currData = await deployedContract.getData();
	console.log("curr data", currData.toString());
};
main();
