
import time
import pytest
from brownie import network, config
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account
from scripts.helpful_scripts import get_account
from scripts.chainlink_api_scripts.request_api import (
    main
)
from scripts.chainlink_api_scripts.read_data import read_contract_data


def test_api_working():
    # arrange
    if(config['networks'][network.show_active()] in LOCAL_BLOCKCHAIN_ENVIRONMENTS):
        pytest.skip("This test is only designed for testnets")

    # act
    main()
    time.sleep(20)
    (all_in_system, is_project, sender_authority, receiver_authority,
     sender, receiver, amount) = read_contract_data()

    # assert
    assert all_in_system == 1
    assert is_project == 1
    assert sender_authority == 2
    assert receiver_authority == 4
