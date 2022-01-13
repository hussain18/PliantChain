import time
import pytest
from brownie import network, config, PLTToken
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account
from scripts.helpful_scripts import get_account
from scripts.chainlink_api_scripts.make_transaction import make_transaction
from web3 import Web3

AMOUNT = Web3.toWei(1, 'ether')


def test_valid_transaction(org_address, working_api_sender, working_api_receiver, working_api_jwtToken):
    # arrange
    if(config['networks'][network.show_active()] in LOCAL_BLOCKCHAIN_ENVIRONMENTS):
        pytest.skip("This test is only designed for testnets")

    account = get_account(id=working_api_sender)
    my_token = PLTToken[-1]
    account_balance = my_token.balanceOf(account.address)

    # act
    make_transaction(org_address, working_api_sender,
                     working_api_receiver, working_api_jwtToken, AMOUNT)
    time.sleep(30)

    transferred_amount = abs(my_token.balanceOf(
        account.address) - account_balance)

    # assert
    assert transferred_amount == AMOUNT


def test_invalid_authority_transfer(org_address, invalid_auth_sender,
                                    invalid_auth_receiver, invalid_auth_jwtToken):
    # arrange
    if(config['networks'][network.show_active()] in LOCAL_BLOCKCHAIN_ENVIRONMENTS):
        pytest.skip("This test is only designed for testnets")

    account = get_account(id=invalid_auth_sender)
    my_token = PLTToken[-1]
    account_balance = my_token.balanceOf(account.address)

    # act
    make_transaction(org_address, invalid_auth_sender,
                     invalid_auth_receiver, invalid_auth_jwtToken, AMOUNT)
    time.sleep(30)

    transferred_amount = abs(my_token.balanceOf(
        account.address)-account_balance)

    # assert
    assert transferred_amount == 0
