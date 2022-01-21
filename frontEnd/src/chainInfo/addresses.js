import brownieConfig from '../brownie-config.json';
import addressesMap from './build/deployments/map.json';
const CHAIN_ID_TO_NAME = {
  1: 'mainnet',
  4: 'rinkeby',
  42: 'kovan',
  1337: 'dev',
};

const getLinkAddress = (chainID) =>
  brownieConfig.networks[CHAIN_ID_TO_NAME[chainID]].link_token;

const getOracleAddress = (chainID) =>
  brownieConfig.networks[CHAIN_ID_TO_NAME[chainID]].oracle;

const getJobAddress = (chainID) =>
  brownieConfig.networks[CHAIN_ID_TO_NAME[chainID]].jobId;

const getFee = (chainID) =>
  brownieConfig.networks[CHAIN_ID_TO_NAME[chainID]].fee;

const getPltAddress = (chainID) => addressesMap[chainID].PLTToken[0];

const getExternalContractAddress = (chainID) =>
  addressesMap[chainID].ExternalAPIConsumer[0];

export {
  getLinkAddress,
  getExternalContractAddress,
  getJobAddress,
  getFee,
  getOracleAddress,
  getPltAddress,
};
