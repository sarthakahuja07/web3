import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";
import verify from "../utils/verify";

const fundMeDeploy: DeployFunction = async ({
	getNamedAccounts,
	deployments
}) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
	const networkName = network.name;
	let priceFeedAddress: string;
	if (developmentChains.includes(networkName)) {
		const AggregatoV3Interface = await deployments.get("MockV3Aggregator");
		priceFeedAddress = AggregatoV3Interface.address;
	} else {
		priceFeedAddress = networkConfig[networkName].priceFeedAddress!;
	}
	log("deploying fundMe");

	const fundMe = await deploy("FundMe", {
		from: deployer,
		args: [priceFeedAddress],
		log: true,
		waitConfirmations: networkConfig[network.name].blockConfirmations || 0
	});
	log(" 👾 👾 👾 👾 👾 👾  deployed fundMe");
	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		await verify(fundMe.address, [priceFeedAddress]);
	}
};
export default fundMeDeploy;
fundMeDeploy.tags = ["FundMe", "all"];
