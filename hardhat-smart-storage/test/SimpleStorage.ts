import { assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage__factory } from "../typechain-types/factories/SimpleStorage__factory";
import { SimpleStorage } from "../typechain-types/SimpleStorage";

describe("SimpleStorage", function () {
	let simpleStorage: SimpleStorage;
	let SimpleStorageFactory: SimpleStorage__factory;
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
		let transactionReceipt = await transactionResponse.wait(1);
		let currentValue = await simpleStorage.getData();
		assert.equal(currentValue.toString(), expectedValue.toString());
	});
	it("should increment the value in store", async () => {
		let startingValue = 5,
			incrementor = 2;
		let transactionResponse = await simpleStorage.setData(startingValue);
		let transactionReceipt = await transactionResponse.wait(1);

		transactionResponse = await simpleStorage.increment(incrementor);
		transactionReceipt = await transactionResponse.wait(1);
		let currentValue = await simpleStorage.getData();
		assert.equal(
			currentValue.toString(),
			(startingValue + incrementor).toString()
		);
	});
	it("should decrement the value in store", async () => {
		let startingValue = 5,
			decrementor = 2;
		let transactionResponse = await simpleStorage.setData(startingValue);
		let transactionReceipt = await transactionResponse.wait(1);

		transactionResponse = await simpleStorage.decrement(decrementor);
		transactionReceipt = await transactionResponse.wait(1);
		let currentValue = await simpleStorage.getData();
		assert.equal(
			currentValue.toString(),
			(startingValue - decrementor).toString()
		);
	});
});
