from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    USER_ADDRESSES,
    USER_LOGIN_TOKENS
)
from brownie import (
    accounts,
    config,
    network,
)
import pytest


@pytest.fixture
def get_job_id():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return 0
    if network.show_active() in config["networks"]:
        return config["networks"][network.show_active()]["jobId"]
    else:
        pytest.skip("Invalid network/link token specified")


@pytest.fixture
def get_data():
    return 100


@pytest.fixture
def dev_account():
    return accounts[0]


@pytest.fixture
def node_account():
    return accounts[1]


@pytest.fixture
def chainlink_fee():
    return 1000000000000000000


@pytest.fixture
def expiry_time():
    return 300


@pytest.fixture
def org_address():
    return USER_ADDRESSES['org']


# Working API accounts
@pytest.fixture
def working_api_sender():
    return 'account2'


@pytest.fixture
def working_api_receiver():
    return USER_ADDRESSES['user3']


@pytest.fixture
def working_api_jwtToken():
    return USER_LOGIN_TOKENS['user1']


# Invalid Authority accounts
@pytest.fixture
def invalid_auth_sender():
    return 'account4'


@pytest.fixture
def invalid_auth_receiver():
    return USER_ADDRESSES['user1']


@pytest.fixture
def invalid_auth_jwtToken():
    return USER_LOGIN_TOKENS['user3']
