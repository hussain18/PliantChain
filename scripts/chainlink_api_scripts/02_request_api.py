#!/usr/bin/python3
from brownie import ExternalAPIConsumer, config, network
from scripts.helpful_scripts import fund_with_link, get_account


def main():
    account = get_account()
    api_contract = ExternalAPIConsumer[-1]
    org_address = config['user_addresses']['org']
    sender_address = config['user_addresses']['user1']
    receiver_address = config['user_addresses']['user2']

    sender_login_token = config['user_login_tokens']['user1']

    tx = fund_with_link(
        api_contract.address, amount=3*config["networks"][network.show_active(
        )]["fee"]
    )
    tx.wait(1)

    request_tx = api_contract.requestAllInSystem(
        sender_login_token, config['networks'][network.show_active(
        )]['all_in_system_jobId'],
        'org_address', 'sender_address', 'receiver_address', {"from": account})
    request_tx.wait(1)
