from scripts.chainlink_api_scripts.make_transaction import make_transaction
from scripts.helpful_scripts import USER_ADDRESSES, USER_LOGIN_TOKENS
from web3 import Web3


def main():
    print("\n In this transaction <<<user1>>> will send one PLT token to <<<user2>>> \n \
----------------------------------------------------------------------------------------------------")
    org_address = USER_ADDRESSES['org']
    receiver_address = USER_ADDRESSES['user2']
    jwtToken = USER_LOGIN_TOKENS['user1']
    amount = Web3.toWei(1, 'ether')

    make_transaction(org_address, 'account2',
                     receiver_address, jwtToken, amount)
