from brownie import ExternalAPIConsumer, config, network
from web3 import Web3
from scripts.helpful_scripts import (
    get_account,
    get_contract,
)
import yaml
import os
import json
import shutil


def deploy_api_consumer():
    fee = config["networks"][network.show_active()]["fee"]
    account = get_account()
    oracle = get_contract("oracle").address
    api_consumer = ExternalAPIConsumer.deploy(
        oracle,
        fee,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get(
            "verify", False),
    )
    print(f"External API Consumer deployed to {api_consumer.address}")
    update_front_end()
    return api_consumer


def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("./build", "./frontEnd/src/chainInfo/build")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./frontEnd/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_api_consumer()
