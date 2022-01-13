from brownie import ExternalAPIConsumer


def main():
    api_contract = ExternalAPIConsumer[-1]
    print("Reading data from {}".format(api_contract.address))
    if api_contract.allInSystem() == 0:
        print(
            "You may have to wait a minute and then call this again, unless on a local chain " +
            "OR check your external API response"
        )

    # API response data
    print("API RESPONSE Data are as Follow:")
    print("allInSystem: ", api_contract.allInSystem())
    print("isProject: ", api_contract.isProject())
    print("senderAuthority: ", api_contract.senderAuthority())
    print("receiverAuthority: ", api_contract.receiverAuthority())

    # Transaction Data
    print("Transaction Data are as Follow:")
    print("sender: ", api_contract.sender())
    print("receiver: ", api_contract.receiver())
    print("amount: ", api_contract.amount())
