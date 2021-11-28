#!/usr/bin/python3
from brownie import ExternalAPIConsumer, config, network
from web3 import Web3
from scripts.helpful_scripts import (
    get_account,
    get_contract,
)


def deploy_api_consumer():
    fee = config["networks"][network.show_active()]["fee"]
    account = get_account()
    oracle = get_contract("oracle").address
    print(oracle)
    api_consumer = ExternalAPIConsumer.deploy(
        oracle,
        fee,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get(
            "verify", False),
    )
    print(f"External API Consumer deployed to {api_consumer.address}")
    return api_consumer


def main():
    deploy_api_consumer()
