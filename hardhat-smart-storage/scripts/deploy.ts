import { ethers, run, network } from "hardhat";

const main = async () => {
	const simpleStorageContract = await ethers.getContractFactory(
		"simpleStorage"
	);

	const deployedContract = await simpleStorageContract.deploy();
	await deployedContract.deployed();

	if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
		console.log("deployed at ", deployedContract.address);
		await deployedContract.deployTransaction.wait(6);
		await verify(deployedContract.address, []);
	}
	console.log("deployed at : ", deployedContract.address);
	var currentValue = await deployedContract.getData();
	console.log("current value : ", currentValue);

	var transactionResponse = await deployedContract.setData(7);
	await transactionResponse.wait(1);
	currentValue = await deployedContract.getData();
	console.log("updated value : ", currentValue);

	var transactionResponse = await deployedContract.increment(3);
	await transactionResponse.wait(1);
	currentValue = await deployedContract.getData();
	console.log("incemented value : ", currentValue);

	
};

const verify = async (contractAddress: string, args: any[]) => {
	try {
		await run("verify:verify", {
			contractAddress,
			args
		});
	} catch (err: any) {
		console.log(err);
	}
};

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
