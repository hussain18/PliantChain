// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./ExternalAPIConsumer.sol";
import "../interfaces/IERC20.sol";
import "./PLT.sol";

contract TransactTokens {
    GLDToken public token;
    ExternalAPIConsumer public extApi;

    constructor(GLDToken _token) public {
        token = _token;
    }

    function authValidation(uint8 auth1, uint8 auth2)
        public
        pure
        returns (bool)
    {
        if (auth1 == 3 && auth2 == 2) {
            return true;
        }
        if (auth1 < auth2) {
            return true;
        } else return false;
    }

    //1. Approve address(this) to transfer tokens
    function sendTokens(
        address _to,
        uint8 auth1,
        uint8 auth2
    ) external payable {
        uint256 tokenAmount = msg.value; //total
        require(
            token.balanceOf(msg.sender) >= tokenAmount,
            "Not enough Tokens"
        );
        require(
            authValidation(auth1, auth2),
            "Invalid Authority transfer attempt"
        );
        token.transferFrom(msg.sender, _to, tokenAmount);
        //   emit TokensTransfer(msg.sender, _to, tokenAmount, rate);
    }

    //1.Need Tokens in TransactTokens
    //2.Choose address who needs to buy tokens

    function buyTokens() external payable {
        uint256 tokenAmount = msg.value; //total
        //address _tokenAddress=0xd9145CCE52D386f254917e481eB44e9943F39138;
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Insufficient tokens"
        );
        //approve(msg.)
        //
        //IERC20(_tokenAddress).
        token.transfer(msg.sender, tokenAmount);
    }
}
