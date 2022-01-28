import { useLinkFunding } from './useLinkFunding';
import { useApproveToken } from './useApproveToken';
import { ethers, utils } from 'ethers';
import { EX_API_ABI } from '../chainInfo/ABIs';
import {
  getExternalContractAddress,
  getJobAddress,
  getPltAddress,
} from '../chainInfo/addresses';
import { useContractFunction, useEthers } from '@usedapp/core';
import { getToken } from '../api';

const useMakeTransaction = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const { chainId, account } = useEthers();
  let transactionState = null;

  const mainContract = new ethers.Contract(
    getExternalContractAddress(chainId || 4),
    EX_API_ABI,
    signer
  );

  const { state, send } = useContractFunction(
    mainContract,
    'makeTransaction',
    signer
  );

  transactionState = state;

  const makeTransaction = async (
    to,
    amount,
    tokenAddress = getPltAddress(chainId || 4)
  ) => {
    send(
      to,
      tokenAddress,
      getToken(),
      account,
      getJobAddress(chainId || 4),
      utils.parseEther(String(amount))
    );
  };

  return [transactionState, makeTransaction];
};

export { useMakeTransaction };
