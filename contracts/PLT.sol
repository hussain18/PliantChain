// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PLTToken is ERC20 {
    constructor() public ERC20("Pliant Chain Token", "PLT") {
        _mint(msg.sender, 1000000000000 * 10**18);
    }
}
