from brownie import ExternalAPIConsumer, config, network, PLTToken, interface
from scripts.helpful_scripts import fund_with_link, get_account, USER_ADDRESSES, USER_LOGIN_TOKENS
from scripts.deploy_PLT import deploy_plt_token
from web3 import Web3


def make_transaction(org_address, sender, receiver_address, jwtToken, amount):

    account = get_account(id=sender)
    api_consumer = ExternalAPIConsumer[-1]

    # get the token that sender wishes to send (in our case it is PLT token)
    if len(PLTToken) <= 0:
        deploy_plt_token(account)
    my_token = PLTToken[-1]

    # Approve token
    approveToken(my_token.address, api_consumer.address, account, amount)

    # Fund the contract with link
    fund_tx = fund_with_link(api_consumer.address, account=account,
                             amount=4*config["networks"][network.show_active()]["fee"])
    fund_tx.wait(1)

    # Make the transaction call
    make_tx = api_consumer.makeTransaction(
        receiver_address,
        my_token.address,
        jwtToken,
        org_address,
        config['networks'][network.show_active()]['jobId'],
        amount,
        {'from': account}
    )
    make_tx.wait(1)

    print('Transaction has been made!')


def main():
    print("In this transaction org will send one PLT token to user1")
    org_address = USER_ADDRESSES['org']
    receiver_address = USER_ADDRESSES['user1']
    jwtToken = USER_LOGIN_TOKENS['org']
    amount = Web3.toWei(1, 'ether')

    make_transaction(org_address, 'account1',
                     receiver_address, jwtToken, amount)


# Helpers
def approveToken(token_address, spender_address, account, amount):
    token_interface = interface.IERC20(token_address)
    approve_tx = token_interface.approve(
        spender_address, amount, {'from': account})
    approve_tx.wait(1)
    print(Web3.fromWei(amount, 'ether'),
          'PLT token was approved for', spender_address)
