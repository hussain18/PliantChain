// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../interfaces/ERC20.sol";

contract PLTToken is ERC20 {
    constructor() public ERC20("Pliant Chain Token", "PLT") {
        _mint(msg.sender, 1000000000000 * 10**18);
    }
}
