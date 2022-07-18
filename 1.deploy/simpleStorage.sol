// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract simpleStorage {
    uint256 public storedData;

    constructor() {
        storedData = 0;
    }

    function setData(uint256 _data) public {
        storedData = _data;
    }

    function getData() public view returns (uint256) {
        return storedData;
    }

    function increment(uint256 inc) public {
        storedData += inc;
    }

    function decrement(uint256 dec) public {
        storedData -= dec;
    }
}
