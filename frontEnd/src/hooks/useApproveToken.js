import {
  getPltAddress,
  getExternalContractAddress,
} from '../chainInfo/addresses';
import { PLT_TOKEN_ABI } from '../chainInfo/ABIs';
import { ethers, utils } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';

const useApproveToken = (tokenAddress = null, tokenABI = PLT_TOKEN_ABI) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let approvingState = null;
  const { chainId } = useEthers();

  const tokenContract = new ethers.Contract(
    tokenAddress || getPltAddress(chainId || 4),
    tokenABI,
    signer
  );

  const { state, send } = useContractFunction(tokenContract, 'approve', signer);

  approvingState = state;

  const approve = (
    amount,
    contractAddress = getExternalContractAddress(chainId || 4)
  ) => {
    send(contractAddress, utils.parseEther(String(amount)));
  };

  return { approvingState, approve };
};

export { useApproveToken };
