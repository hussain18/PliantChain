from scripts.chainlink_api_scripts.make_transaction import make_transaction
from brownie import ExternalAPIConsumer, config, network, PLTToken, interface
from scripts.helpful_scripts import fund_with_link, get_account, USER_ADDRESSES, USER_LOGIN_TOKENS
from scripts.deploy_PLT import deploy_plt_token
from web3 import Web3


def main():
    print("\n In this transaction org will send one PLT token to user1 \n \
----------------------------------------------------------------------------------------------------")
    org_address = USER_ADDRESSES['org']
    receiver_address = USER_ADDRESSES['user1']
    jwtToken = USER_LOGIN_TOKENS['org']
    amount = Web3.toWei(1, 'ether')

    make_transaction(org_address, 'account1',
                     receiver_address, jwtToken, amount)
