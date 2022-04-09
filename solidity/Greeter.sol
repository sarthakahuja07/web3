// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Greeter {
    string public yourName;

    constructor() {
        yourName = "world";
    }

    function setName(string memory _name) public {
        yourName = _name;
    }

    function print() public view returns (string memory) {
        return yourName;
    }
}
