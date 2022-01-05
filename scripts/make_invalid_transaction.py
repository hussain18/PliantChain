from scripts.chainlink_api_scripts.make_transaction import make_transaction
from brownie import ExternalAPIConsumer, config, network, PLTToken, interface
from scripts.helpful_scripts import fund_with_link, get_account, USER_ADDRESSES, USER_LOGIN_TOKENS
from scripts.deploy_PLT import deploy_plt_token
from web3 import Web3


def main():
    print("\n In this transaction user1 will send one PLT token to org which is an invalid transaction \n \
----------------------------------------------------------------------------------------------------")
    org_address = USER_ADDRESSES['user1']
    receiver_address = USER_ADDRESSES['org']
    jwtToken = USER_LOGIN_TOKENS['user1']
    amount = Web3.toWei(1, 'ether')

    make_transaction(org_address, 'account1',
                     receiver_address, jwtToken, amount)
