import {
  useEtherBalance,
  useEthers,
  useToken,
  useTokenBalance,
} from '@usedapp/core';
import { getPltAddress, getLinkAddress } from '../chainInfo/addresses';
import { formatUnits, formatEther } from '@ethersproject/units';

const ETHER_ICON = require('../img/Ether_icon.png').default;

const BalanceView = (props) => {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='p-5'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <img src={ETHER_ICON} style={{ height: 30 }} />
          </div>
          <div className='ml-5 w-0 flex-1'>
            <dl>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {props.name}
              </dt>
              <dd>
                <div className='text-lg font-medium text-gray-900'>
                  {props.amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-5 py-3'>
        <div className='text-sm'></div>
      </div>
    </div>
  );
};

const UserBalances = (props) => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const pltBalance = useTokenBalance(getPltAddress(chainId || 4), account);
  return etherBalance && pltBalance ? (
    <>
      <BalanceView name='Ether' amount={formatEther(etherBalance)} />
      <BalanceView name='PLT Token' amount={formatUnits(pltBalance, 18)} />
    </>
  ) : (
    <div>Loading...</div>
  ); //TODO: style it
};

export default UserBalances;
