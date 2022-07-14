// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import './libraries/PriceConvertor.sol';

contract FundMe {
    using PriceConvertor for uint256;
    uint256 minUsd = 1 * 1e18;
    address[] funders;
    mapping(address => uint256) addressToFunds;


    function fund() public payable {
        require(msg.value.getConversionRate() > minUsd, "minimum of 10USD needed");
        funders.push(msg.sender);
        addressToFunds[msg.sender] += msg.value;
    }

    function getFundsFromAdrress (address funder) public view returns (uint256){
        return addressToFunds[funder];
    }
   
}
