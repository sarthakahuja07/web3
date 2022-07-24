import { DeployFunction } from "hardhat-deploy/dist/types";
import { network } from "hardhat";
const deployMocks: DeployFunction = async ({
	getNamedAccounts,
	deployments
}) => {
	const DECIMALS = "18";
	const INITIAL_PRICE = "2000000000000000000000";
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	if (chainId === 31337) {
		log("deploying deployMocks");

		await deploy("MockV3Aggregator", {
			from: deployer,
			args: [DECIMALS, INITIAL_PRICE],
			log: true
		});
		log(" 👾 👾 👾 👾 👾 👾  deployed deployMocks");
	}
};

export default deployMocks;
deployMocks.tags = ["AggregatorV3InterfaceMock", "all", "mocks"];
