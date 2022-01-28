import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { authRequest, GET } from '../api';
import { useMakeTransaction, useApproveToken, useLinkFunding } from '../hooks';

export function ConnectToWeb3() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [offChainAccount, setOffChainAccount] = useState(null);
  const [txState, makeTransaction] = useMakeTransaction();
  const { approvingState, approve } = useApproveToken();
  const { fundingState, fundWithLink } = useLinkFunding();
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    address: '',
  });

  useEffect(() => {
    getOffChainAccount();
  }, [!offChainAccount]);

  const getOffChainAccount = async () => {
    const user = await authRequest('/user', GET);
    setOffChainAccount(user.accountAddress);
  };

  const handleTransactionDataChange = (event) => {
    const data = { ...transactionData };
    data[event.target.name] = event.target.value;
    setTransactionData(data);
  };

  const submitTransaction = () => {
    approve(transactionData.amount);
    fundWithLink();
    makeTransaction(transactionData.address, transactionData.amount);

    setTransactionData({
      amount: 0,
      address: '',
    });
  };

  return !account ? (
    <div>
      <button
        type='button'
        className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
        onClick={() => activateBrowserWallet()}
      >
        Connect
      </button>
    </div>
  ) : (
    <div>
      {offChainAccount === account.toLowerCase() ? (
        <>
          <div className='mt-1 border-b border-gray-300 focus-within:border-indigo-600'>
            <input
              type='number'
              name='amount'
              onChange={handleTransactionDataChange}
              value={transactionData.amount}
              id='name'
              className='block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm'
              placeholder='Enter the amount'
            />
          </div>
          <div className='mt-1 border-b border-gray-300 focus-within:border-cyan-600'>
            <input
              type='text'
              name='address'
              id='name'
              value={transactionData.address}
              onChange={handleTransactionDataChange}
              className='block w-full border-0 border-b border-transparent bg-gray-50 focus:border-cyan-600 focus:ring-0 sm:text-sm'
              placeholder='Enter an address'
            />
          </div>
          <button
            onClick={() => submitTransaction()}
            type='button'
            className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Send Money
          </button>
          <button
            type='button'
            onClick={() => deactivate()}
            className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Disconnect
          </button>
          <p>Transaction Status: {txState.status}</p>
        </>
      ) : (
        <p className='text-sky-400/50'>
          NOTE: you are connected to a wrong account!
        </p>
      )}
    </div>
  );
}
