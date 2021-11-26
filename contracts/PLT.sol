// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./ERC20.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }
    //1000000000000000000000
    /*
    function sendTokens(address _to,uint8 auth1, uint8 auth2) external payable {
        uint tokenAmount= msg.value;//total 
        require(balanceOf(msg.sender)>=tokenAmount,"Not enough Tokens");
        require(authValidation(auth1,auth2),"Invalid Authority transfer attempt");
        transfer(_to,tokenAmount);
     //   emit TokensTransfer(msg.sender, _to, tokenAmount, rate);
    }

    function buyTokens()external payable{
        uint tokenAmount= msg.value;//total 
        require(address(msg.sender).balance>=tokenAmount,"Insufficient tokens");
        //approve(msg.)
        //IERC20(_tokenAddress).
        transfer(_msgSender(),tokenAmount);
    }*/
}
