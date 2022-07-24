import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";

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

	await deploy("FundMe", {
		from: deployer,
		args: [priceFeedAddress],
		log: true
	});
	log(" 👾 👾 👾 👾 👾 👾  deployed fundMe");
};
export default fundMeDeploy;
fundMeDeploy.tags = ["FundMe", "all"];
