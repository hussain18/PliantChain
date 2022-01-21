import LinkContract from './build/contracts/LinkToken.json';
import PltContract from './build/contracts/PLTToken.json';
import ExternalAPIContract from './build/contracts/ExternalAPIConsumer.json';

const LINK_TOKEN_ABI = LinkContract.abi;
const PLT_TOKEN_ABI = PltContract.abi;
const EX_API_ABI = ExternalAPIContract.abi;

export { LINK_TOKEN_ABI, PLT_TOKEN_ABI, EX_API_ABI };
