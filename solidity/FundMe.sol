// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./PriceConvertor.sol";

contract FundMe {
    using PriceConvertor for uint256;

    uint256 public  minUsd = 1 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToFunds;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner{
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() > minUsd, "minimum of 10USD needed");
        funders.push(msg.sender);
        addressToFunds[msg.sender] += msg.value;
    }

    function withdraw() public isOwner{
        for(uint i=0; i<funders.length; i++){
            address founderAddress=funders[i];
            addressToFunds[founderAddress]=0;
        }
        funders = new address[](0);
        //  to transfer - 3 methods - send,transfer, call
        // payable(msg.sender).transfer(address(this).balance); 
    
        // payable(msg.sender).send(address(this).balance);

        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "withdraw failed");
    }

    function getFundsFromAdrress (address funder) public view returns (uint256){
        return addressToFunds[funder];
    }
   
}
