import { assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
	let simpleStorage: Contract
	let SimpleStorageFactory;
	beforeEach(async () => {
		SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await SimpleStorageFactory.deploy();
	});
	it("Should start with 0", async function () {
		let currentValue = await simpleStorage.getData();
		assert.equal(currentValue.toString(), "0");
	});
	it("Should update when we call store", async function () {
		let expectedValue = 7;
		let transactionResponse = await simpleStorage.setData(expectedValue);
		let transactionReceipt = await transactionResponse.wait();
		let currentValue = await simpleStorage.getData();
		assert.equal(currentValue.toString(), expectedValue.toString());
	});
});
