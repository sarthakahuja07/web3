import { task } from "hardhat/config";

export default task("accounts", "return the accounts").setAction(
	async (taskArgs, hre) => {
		const accounts = await hre.ethers.getSigners();

		for (const account in accounts) {
			console.log(`Address : ${accounts[account].address}`);
			console.log("Balance : ", await accounts[account].getBalance());
		}
	}
);
