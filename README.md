![alt text](./PlianChain.jpeg "Logo Title")

# Prerequisites:
To work with this project you will need to have the following softwares installed
- [NodeJS](https://nodejs.org/en/download/)
- [ReactJS](https://reactjs.net/getting-started/download.html)
- [Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

And if you plan to run your own chainlink node then take a look at its [github repo](https://github.com/smartcontractkit/chainlink) to install and also you can visit its [official docs](https://docs.chain.link/docs/running-a-chainlink-node/) on running a chainlink node.

# How to use:
To use the project firs clone the project by running this command:
```bash
git clone https://github.com/hussain18/PliantChain.git
```
## Server
To start server run the following commands:
```bash
cd server
npm install
yarn install
npm start   
```

## Front-End
To start front-end run:
```bash
cd front-end
npm install
npm start   
```
**Note:** the above commands are only for first time after that you can go to respective directory and ren `npm install` to run server/front-end

## Define a bridge
To use chainlink [external adaptor](./server/api/chainExternalAdapter.js) defined in server you need to create a [chainlink bridge](https://docs.chain.link/docs/node-operators/) to add you external adopter to [chainlink nodes](https://github.com/smartcontractkit/chainlink).

## Chainlink External Adaptor
- Input:
    ```json
    {
        "orgAddress": "0xsampleaccountaddress1122333",
        "senderAddress": "0xsampleaccountaddress1122333",
        "receiverAddress": "0xsampleaccountaddress1122333",
        "jwtToken": "eyJhbGciOiJIUzsomjwttokenajasj1231"
    }
    ```
- Output:
    ```json
    {
        "allInSystem": 11,
        "isProject": 2,
        "senderAuthority": 2,
        "receiverAuthority": 3,
    }
    ```

## Chainlink Job Definitions
To learn how to create direct request job refer to [chainlink docs](https://docs.chain.link/docs/jobs/types/direct-request/).

Job definitions for [our contract](.contracts/ExternalAPIConsumer.sol) are as follows:

### Pliant-Chian_Adapter_receiverAuthority
```toml
    type = "directrequest"
    schemaVersion = 1
    name = "Pliant-Chian_Adapter_receiverAuthority"
    contractAddress = "0xec5368C5C258412B8518AEeb6966FAE07d0fc545"
    maxTaskDuration = "0s"
    observationSource = """
        decode_log   [type=ethabidecodelog
                    abi="OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)"
                    data="$(jobRun.logData)"
                    topics="$(jobRun.logTopics)"]

        decode_cbor  [type=cborparse data="$(decode_log.data)"]
        fetch        [type=bridge name="test_pliant-chain_adaptor" requestData="{\\"id\\":$(jobSpec.externalJobID),\\"data\\":{\\"orgAddress\\": $(decode_cbor.orgAddress),\\"senderAddress\\":$(decode_cbor.senderAddress),\\"receiverAddress\\": $(decode_cbor.receiverAddress),\\"jwtToken\\": $(decode_cbor.jwtToken)}}"]
        parse        [type=jsonparse path="data,receiverAuthority" data="$(fetch)"]
        encode_data  [type=ethabiencode abi="(uint256 value)" data="{ \\"value\\": $(parse) }"]
        encode_tx    [type=ethabiencode
                    abi="fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)"
                    data="{\\"requestId\\": $(decode_log.requestId), \\"payment\\": $(decode_log.payment), \\"callbackAddress\\": $(decode_log.callbackAddr), \\"callbackFunctionId\\": $(decode_log.callbackFunctionId), \\"expiration\\": $(decode_log.cancelExpiration), \\"data\\": $(encode_data)}"
                    ]
        submit_tx    [type=ethtx to="0xec5368C5C258412B8518AEeb6966FAE07d0fc545" data="$(encode_tx)"]

        decode_log -> decode_cbor -> fetch -> parse -> encode_data -> encode_tx -> submit_tx
    """
```

### Pliant-Chian_Adapter_senderAuthority
```toml
    type = "directrequest"
    schemaVersion = 1
    name = "Pliant-Chian_Adapter_senderAuthority"
    contractAddress = "0xec5368C5C258412B8518AEeb6966FAE07d0fc545"
    maxTaskDuration = "0s"
    observationSource = """
        decode_log   [type=ethabidecodelog
                    abi="OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)"
                    data="$(jobRun.logData)"
                    topics="$(jobRun.logTopics)"]

        decode_cbor  [type=cborparse data="$(decode_log.data)"]
        fetch        [type=bridge name="test_pliant-chain_adaptor" requestData="{\\"id\\":$(jobSpec.externalJobID),\\"data\\":{\\"orgAddress\\": $(decode_cbor.orgAddress),\\"senderAddress\\":$(decode_cbor.senderAddress),\\"receiverAddress\\": $(decode_cbor.receiverAddress),\\"jwtToken\\": $(decode_cbor.jwtToken)}}"]
        parse        [type=jsonparse path="data,senderAuthority" data="$(fetch)"]
        encode_data  [type=ethabiencode abi="(uint256 value)" data="{ \\"value\\": $(parse) }"]
        encode_tx    [type=ethabiencode
                    abi="fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)"
                    data="{\\"requestId\\": $(decode_log.requestId), \\"payment\\": $(decode_log.payment), \\"callbackAddress\\": $(decode_log.callbackAddr), \\"callbackFunctionId\\": $(decode_log.callbackFunctionId), \\"expiration\\": $(decode_log.cancelExpiration), \\"data\\": $(encode_data)}"
                    ]
        submit_tx    [type=ethtx to="0xec5368C5C258412B8518AEeb6966FAE07d0fc545" data="$(encode_tx)"]

        decode_log -> decode_cbor -> fetch -> parse -> encode_data -> encode_tx -> submit_tx
    """
```

### Pliant-Chian_Adapter_isProject
```toml
    type = "directrequest"
    schemaVersion = 1
    name = "Pliant-Chian_Adapter_isProject"
    contractAddress = "0xec5368C5C258412B8518AEeb6966FAE07d0fc545"
    maxTaskDuration = "0s"
    observationSource = """
        decode_log   [type=ethabidecodelog
                    abi="OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)"
                    data="$(jobRun.logData)"
                    topics="$(jobRun.logTopics)"]

        decode_cbor  [type=cborparse data="$(decode_log.data)"]
        fetch        [type=bridge name="test_pliant-chain_adaptor" requestData="{\\"id\\":$(jobSpec.externalJobID),\\"data\\":{\\"orgAddress\\": $(decode_cbor.orgAddress),\\"senderAddress\\":$(decode_cbor.senderAddress),\\"receiverAddress\\": $(decode_cbor.receiverAddress),\\"jwtToken\\": $(decode_cbor.jwtToken)}}"]
        parse        [type=jsonparse path="data,isProject" data="$(fetch)"]
        encode_data  [type=ethabiencode abi="(uint256 value)" data="{ \\"value\\": $(parse) }"]
        encode_tx    [type=ethabiencode
                    abi="fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)"
                    data="{\\"requestId\\": $(decode_log.requestId), \\"payment\\": $(decode_log.payment), \\"callbackAddress\\": $(decode_log.callbackAddr), \\"callbackFunctionId\\": $(decode_log.callbackFunctionId), \\"expiration\\": $(decode_log.cancelExpiration), \\"data\\": $(encode_data)}"
                    ]
        submit_tx    [type=ethtx to="0xec5368C5C258412B8518AEeb6966FAE07d0fc545" data="$(encode_tx)"]

        decode_log -> decode_cbor -> fetch -> parse -> encode_data -> encode_tx -> submit_tx
    """
```

### Pliant-Chian_Adapter_allInSystem
```toml
    type = "directrequest"
    schemaVersion = 1
    name = "Pliant-Chian_Adapter_allInSystem"
    contractAddress = "0xec5368C5C258412B8518AEeb6966FAE07d0fc545"
    maxTaskDuration = "0s"
    observationSource = """
        decode_log   [type=ethabidecodelog
                    abi="OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)"
                    data="$(jobRun.logData)"
                    topics="$(jobRun.logTopics)"]

        decode_cbor  [type=cborparse data="$(decode_log.data)"]
        fetch        [type=bridge name="test_pliant-chain_adaptor" requestData="{\\"id\\":$(jobSpec.externalJobID),\\"data\\":{\\"orgAddress\\": $(decode_cbor.orgAddress),\\"senderAddress\\":$(decode_cbor.senderAddress),\\"receiverAddress\\": $(decode_cbor.receiverAddress),\\"jwtToken\\": $(decode_cbor.jwtToken)}}"]
        parse        [type=jsonparse path="data,allInSystem" data="$(fetch)"]
        encode_data  [type=ethabiencode abi="(uint256 value)" data="{ \\"value\\": $(parse) }"]
        encode_tx    [type=ethabiencode
                    abi="fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)"
                    data="{\\"requestId\\": $(decode_log.requestId), \\"payment\\": $(decode_log.payment), \\"callbackAddress\\": $(decode_log.callbackAddr), \\"callbackFunctionId\\": $(decode_log.callbackFunctionId), \\"expiration\\": $(decode_log.cancelExpiration), \\"data\\": $(encode_data)}"
                    ]
        submit_tx    [type=ethtx to="0xec5368C5C258412B8518AEeb6966FAE07d0fc545" data="$(encode_tx)"]

        decode_log -> decode_cbor -> fetch -> parse -> encode_data -> encode_tx -> submit_tx
    """
```

# Deploying Smart Contracts
You can deploy and test contracts using [scripts](./scripts) and brownie else you can do that using [remix IDE](https://remix.ethereum.org/).

you only need to deploy `ExternalAPIConsumer.sol` and `PLT.sol` form contracts folder and follow the following steps to make transaction:
1. [Approve](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20) PLT token
2. [Fund](https://docs.chain.link/docs/fund-your-contract/) `ExternalAPIConsumer.sol` with LINK token.
3. Replace hard coded jobIds from `makeTransaction()` in `ExternalAPIConsumer.sol` with your jobIds.
4. Call `makeTransaction()` in `ExternalAPIConsumer.sol`

And you are all done!!
