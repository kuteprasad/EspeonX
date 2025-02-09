// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RevenueSharing is Ownable {
    IERC20 public token;
    uint256 public communityPool;
    uint256 public devPool;
    uint256 public teamPool;

    constructor(IERC20 _token) {
        token = _token;
    }

    function distributeRevenue(uint256 amount) external onlyOwner {
        uint256 communityShare = (amount * 5) / 100;
        uint256 devShare = (amount * 10) / 100;
        uint256 teamShare = (amount * 20) / 100;

        communityPool += communityShare;
        devPool += devShare;
        teamPool += teamShare;

        token.transferFrom(msg.sender, address(this), amount);
    }

    function claimCommunityReward(address to, uint256 amount) external onlyOwner {
        require(amount <= communityPool, "Insufficient community pool");
        communityPool -= amount;
        token.transfer(to, amount);
    }

    function claimDevReward(address to, uint256 amount) external onlyOwner {
        require(amount <= devPool, "Insufficient dev pool");
        devPool -= amount;
        token.transfer(to, amount);
    }

    function claimTeamReward(address to, uint256 amount) external onlyOwner {
        require(amount <= teamPool, "Insufficient team pool");
        teamPool -= amount;
        token.transfer(to, amount);
    }
}