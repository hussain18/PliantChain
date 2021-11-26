// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ExternalAPIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public allInSystem;
    uint256 public isProject;
    uint256 public senderAuthority;
    uint256 public receiverAuthority;

    address private oracle;
    uint256 private fee;

    event requestFulfilled(bytes32 requestId, uint256 value);

    /**
     * Jobs for this contract is created on a local chianlink node
     * NOTE: to use the contract you need to create your own node, bridge and jobs
     */

    /**
     * LOCAL_NODE JOB IDs:
     *   1. allInSystem: 5787b0018e624c0fa81b36573cc766fa
     *   2. isProject: 5c0a8996ef474b37874a59d511058829
     *   3. senderAuthority: 3f0baa9f71ad49d59cb11aeab10686a7
     *   4. receiverAuthority: 5136b192a71c476a90631dbb00a1201d
     */

    constructor(address _oracle) {
        setPublicChainlinkToken();
        oracle = _oracle;
        fee = 0.1 * 10**18;
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
            this.fulfillSenderAuthority.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
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
            this.fulfillSenderAuthority.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
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
            this.fulfillSenderAuthority.selector
        );
        request.add("orgAddress", _orgAddress);
        request.add("senderAddress", _senderAddress);
        request.add("receiverAddress", _receiverAddress);
        request.add("jwtToken", _jwtToken);
        sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Callback functions
     */
    function fulfillAllInSystem(bytes32 _requestId, uint256 _allInSystem)
        public
        recordChainlinkFulfillment(_requestId)
    {
        allInSystem = _allInSystem;
        emit requestFulfilled(_requestId, allInSystem);
    }

    function fulfillIsProject(bytes32 _requestId, uint256 _isProject)
        public
        recordChainlinkFulfillment(_requestId)
    {
        isProject = _isProject;
        emit requestFulfilled(_requestId, isProject);
    }

    function fulfillSenderAuthority(
        bytes32 _requestId,
        uint256 _senderAuthority
    ) public recordChainlinkFulfillment(_requestId) {
        senderAuthority = _senderAuthority;
        emit requestFulfilled(_requestId, senderAuthority);
    }

    function fulfillReceiverAuthority(
        bytes32 _requestId,
        uint256 _receiverAuthority
    ) public recordChainlinkFulfillment(_requestId) {
        receiverAuthority = _receiverAuthority;
        emit requestFulfilled(_requestId, receiverAuthority);
    }

    // Helpers
    function stringToBytes32(string memory source)
        public
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
}
