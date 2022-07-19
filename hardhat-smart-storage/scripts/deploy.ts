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
	console.log(deployedContract.address);
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
