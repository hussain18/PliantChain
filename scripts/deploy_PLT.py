#!/usr/bin/python3
from brownie import PLTToken, config, network
from web3 import Web3
from scripts.helpful_scripts import get_account


def deploy_plt_token(acc=False):

    account = acc

    if not acc:
        account = get_account()

    plt_token = PLTToken.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()].get(
            "verify", False),
    )
    print(f"PLT token deployed to {plt_token.address}")
    return plt_token


def main():
    deploy_plt_token()
