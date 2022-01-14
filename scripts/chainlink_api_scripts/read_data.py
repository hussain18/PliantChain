from brownie import ExternalAPIConsumer


def read_contract_data():
    api_contract = ExternalAPIConsumer[-1]
    print("Reading data from {}".format(api_contract.address))
    if api_contract.allInSystem() == 0:
        print(
            "You may have to wait a minute and then call this again, unless on a local chain " +
            "OR check your external API response"
        )

    # API response data
    all_in_system = api_contract.allInSystem()
    is_project = api_contract.isProject()
    sender_authority = api_contract.senderAuthority()
    receiver_authority = api_contract.receiverAuthority()

    # Transaction Data
    sender = api_contract.sender()
    receiver = api_contract.receiver()
    amount = api_contract.amount()

    return(all_in_system, is_project, sender_authority, receiver_authority, sender, receiver, amount)


def main():
    (all_in_system, is_project, sender_authority, receiver_authority,
     sender, receiver, amount) = read_contract_data()

    # API response data
    print("API RESPONSE Data are as Follow:")
    print("allInSystem: ", all_in_system)
    print("isProject: ", is_project)
    print("senderAuthority: ", sender_authority)
    print("receiverAuthority: ", receiver_authority)

    # Transaction Data
    print("Transaction Data are as Follow:")
    print("sender: ", sender)
    print("receiver: ", receiver)
    print("amount: ", amount)
