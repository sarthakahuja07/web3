// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract FundMe {
    uint256 minUsd = 10 * 1e18;
    
    function fund() public payable {
        require(getConversionRate(msg.value) > minUsd, "minimum of 10USD needed");
    }

    function getPrice() public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (
            ,
            int price,
            ,
            ,
        ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate(uint256 ethAmount) public view returns (uint256){
        uint256 ethPrice = getPrice();
        uint256 priceInUSD =  (ethPrice *ethAmount ) / 1e18;
        return priceInUSD;
    }

}
