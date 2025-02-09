// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tournament is Ownable {
    IERC20 public token;
    uint256 public prizePool;

    constructor(IERC20 _token) {
        token = _token;
    }

    function enterTournament(uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
        prizePool += amount;
    }

    function distributePrizes(address[] calldata winners, uint256[] calldata amounts) external onlyOwner {
        require(winners.length == amounts.length, "Mismatched inputs");

        for (uint256 i = 0; i < winners.length; i++) {
            require(amounts[i] <= prizePool, "Insufficient prize pool");
            prizePool -= amounts[i];
            token.transfer(winners[i], amounts[i]);
        }
    }
}