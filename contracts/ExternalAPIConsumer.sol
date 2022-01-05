// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ExternalAPIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 private allInSystem;
    uint256 private isProject;
    uint256 private senderAuthority;
    uint256 private receiverAuthority;

    address private oracle;
    uint256 private fee;

    // Transaction data
    address private sender;
    address private receiver;
    uint256 private amount;
    address private tokenAddress;

    event requestFulfilled(bytes32 requestId, uint256 value);

    /**
     * Jobs for this contract is created on a local chianlink node
     * NOTE: to use the contract you need to create your own node, bridge and jobs
     */

    constructor(address _oracle, uint256 _fee) public {
        setPublicChainlinkToken();
        oracle = _oracle;
        fee = _fee;
    }

    /**
     * Request functions
     */
    function requestAllInSystem(
        string memory _jwtToken,
        string memory _jobId,
        string memory _orgAddress,
        string memory _senderAddress,
        string memory _receiverAddress
    ) public {
        Chainlink.Request memory request = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillAllInSystem.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
        request.add("jsonPath", "data,allInSystem");
        sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestIsProject(
        string memory _jwtToken,
        string memory _jobId,
        string memory _orgAddress,
        string memory _senderAddress,
        string memory _receiverAddress
    ) public {
        Chainlink.Request memory request = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillIsProject.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
        request.add("jsonPath", "data,isProject");
        sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestSenderAuthority(
        string memory _jwtToken,
        string memory _jobId,
        string memory _orgAddress,
        string memory _senderAddress,
        string memory _receiverAddress
    ) public {
        Chainlink.Request memory request = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillSenderAuthority.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
        request.add("jsonPath", "data,senderAuthority");
        sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestReceiverAuthority(
        string memory _jwtToken,
        string memory _jobId,
        string memory _orgAddress,
        string memory _senderAddress,
        string memory _receiverAddress
    ) public {
        Chainlink.Request memory request = buildChainlinkRequest(
            stringToBytes32(_jobId),
            address(this),
            this.fulfillReceiverAuthority.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
        request.add("jsonPath", "data,receiverAuthority");
        sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Callback functions
     */
    function fulfillAllInSystem(bytes32 _requestId, uint256 _allInSystem)
        external
        recordChainlinkFulfillment(_requestId)
    {
        allInSystem = _allInSystem;
        require(allInSystem > 0, "Not all in system");
        require(authValidation(), "Invalid Authority transfer attempt");
        sendTokens();
        emit requestFulfilled(_requestId, allInSystem);
    }

    function fulfillIsProject(bytes32 _requestId, uint256 _isProject)
        external
        recordChainlinkFulfillment(_requestId)
    {
        isProject = _isProject;
        emit requestFulfilled(_requestId, isProject);
    }

    function fulfillSenderAuthority(
        bytes32 _requestId,
        uint256 _senderAuthority
    ) external recordChainlinkFulfillment(_requestId) {
        senderAuthority = _senderAuthority;
        emit requestFulfilled(_requestId, senderAuthority);
    }

    function fulfillReceiverAuthority(
        bytes32 _requestId,
        uint256 _receiverAuthority
    ) external recordChainlinkFulfillment(_requestId) {
        receiverAuthority = _receiverAuthority;
        emit requestFulfilled(_requestId, receiverAuthority);
    }

    // Transaction function
    function makeTransaction(
        address _to,
        address _tokenAddress,
        string memory _jwtToken,
        string memory _orgAddress,
        string memory _jobId,
        uint256 _amount
    ) external {
        string memory senderAddress = toString(msg.sender);
        string memory receiverAddress = toString(_to);

        // Setting transacToken data
        sender = msg.sender;
        receiver = _to;
        amount = _amount;
        tokenAddress = _tokenAddress;

        // Getting verification data from offchain database
        requestIsProject(
            _jwtToken,
            _jobId,
            _orgAddress,
            senderAddress,
            receiverAddress
        );
        requestSenderAuthority(
            _jwtToken,
            _jobId,
            _orgAddress,
            senderAddress,
            receiverAddress
        );
        requestReceiverAuthority(
            _jwtToken,
            _jobId,
            _orgAddress,
            senderAddress,
            receiverAddress
        );
        requestAllInSystem(
            _jwtToken,
            _jobId,
            _orgAddress,
            senderAddress,
            receiverAddress
        );
    }

    // Validation functions
    function authValidation() internal returns (bool) {
        if (senderAuthority == 3 && receiverAuthority == 2) {
            return true;
        }
        if (senderAuthority < receiverAuthority) {
            return true;
        } else return false;
    }

    //1. Approve address(this) to transfer tokens
    function sendTokens() public payable {
        uint256 tokenAmount = amount; //total
        if (tokenAmount > 0) {
            IERC20 myToken = IERC20(tokenAddress);
            require(
                myToken.balanceOf(sender) >= tokenAmount,
                "Not enough Tokens"
            );

            uint256 allowance = myToken.allowance(sender, address(this));

            require(allowance >= tokenAmount, "Not Enough Token Allowance");

            myToken.transferFrom(sender, receiver, tokenAmount);
            clearValues();
        }
    }

    // Helpers
    function stringToBytes32(string memory source)
        internal
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function toString(address account) internal pure returns (string memory) {
        return toString(abi.encodePacked(account));
    }

    function toString(uint256 value) internal pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes32 value) internal pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes memory data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    function clearValues() private {
        allInSystem = 0;
        isProject = 0;
        senderAuthority = 0;
        receiverAuthority = 0;
        sender = 0x0000000000000000000000000000000000000000;
        receiver = 0x0000000000000000000000000000000000000000;
        amount = 0;
    }
}
