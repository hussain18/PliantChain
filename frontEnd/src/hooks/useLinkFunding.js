import {
  getLinkAddress,
  getFee,
  getExternalContractAddress,
} from '../chainInfo/addresses';
import { LINK_TOKEN_ABI } from '../chainInfo/ABIs';
import { ethers, utils } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';

const DEFAULT_FEE = getFee(4) / 1000000000000000000;

const useLinkFunding = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let fundingState = null;
  const { chainId } = useEthers();

  const LinkToken = new ethers.Contract(
    getLinkAddress(chainId || 4),
    LINK_TOKEN_ABI,
    signer
  );

  const { state, send } = useContractFunction(LinkToken, 'transfer', signer);

  fundingState = state;

  const fundWithLink = (
    amount = DEFAULT_FEE * 4,
    contractAddress = getExternalContractAddress(chainId || 4)
  ) => {
    send(contractAddress, utils.parseEther(String(amount)));
  };

  return { fundingState, fundWithLink };
};

export { useLinkFunding };
