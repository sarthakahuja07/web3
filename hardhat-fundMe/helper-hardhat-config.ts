type networkConfigType = {
	priceFeedAddress?: string;
};
type networkConfigTypeObject = {
	[key: string]: networkConfigType;
};

const networkConfig: networkConfigTypeObject = {
	localhost: {},
	hardhat: {},
	rinkeby: {
		priceFeedAddress : "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
	},
	mumbai: {
		priceFeedAddress : "0x0715A7794a1dc8e42615F059dD6e406A6594651A"
	}
};
const developmentChains = ["hardhat", "localhost"];

export { networkConfig, developmentChains };
