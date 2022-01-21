import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { authRequest, GET } from '../api';
import { useMakeTransaction, useApproveToken, useLinkFunding } from '../hooks';

export function ConnectToWeb3() {
  const { activateBrowserWallet, account } = useEthers();
  const [offChainAccount, setOffChainAccount] = useState(null);
  const [txState, makeTransaction] = useMakeTransaction();
  const { approvingState, approve } = useApproveToken();
  const { fundingState, fundWithLink } = useLinkFunding();

  useEffect(() => {
    getOffChainAccount();
  }, [!offChainAccount]);

  const getOffChainAccount = async () => {
    const user = await authRequest('/user', GET);
    setOffChainAccount(user.accountAddress);
  };

  console.log('state: ', txState, makeTransaction); // test...

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
          <button
            type='button'
            className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Disconnect
          </button>
          <button
            type='button'
            // onClick={() =>
            //   makeTransaction('0xc3090cd5160CB689051F0083944cbcEa6a1be19B', 2)
            // }
            className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Send money
          </button>
        </>
      ) : (
        <p className='text-sky-400/50'>
          NOTE: you are connected to a wrong account!
        </p>
      )}
    </div>
  );
}
