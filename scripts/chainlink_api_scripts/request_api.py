from brownie import ExternalAPIConsumer, config, network
from scripts.helpful_scripts import fund_with_link, get_account, USER_ADDRESSES, USER_LOGIN_TOKENS


def req_allInSystem(org, sender, receiver, token, job_id):
    account = get_account()
    api_contract = ExternalAPIConsumer[-1]
    print("Requesting all in system")
    request_tx = api_contract.requestAllInSystem(
        token, job_id,
        org, sender, receiver, {"from": account})
    request_tx.wait(1)


def req_isProject(org, sender, receiver, token, job_id):
    account = get_account()
    api_contract = ExternalAPIConsumer[-1]
    print("Requesting is project")
    request_tx = api_contract.requestIsProject(
        token, job_id,
        org, sender, receiver, {"from": account})
    request_tx.wait(1)


def req_senderAuthority(org, sender, receiver, token, job_id):
    account = get_account()
    api_contract = ExternalAPIConsumer[-1]
    print("Requesting sender authority")
    request_tx = api_contract.requestSenderAuthority(
        token, job_id,
        org, sender, receiver, {"from": account})
    request_tx.wait(1)


def req_receiverAuthority(org, sender, receiver, token, job_id):
    account = get_account()
    api_contract = ExternalAPIConsumer[-1]
    print("Requesting receiver authority")
    request_tx = api_contract.requestReceiverAuthority(
        token, job_id,
        org, sender, receiver, {"from": account})
    request_tx.wait(1)


def main():
    api_contract = ExternalAPIConsumer[-1]
    org_address = USER_ADDRESSES['org']
    sender_address = USER_ADDRESSES['user1']
    receiver_address = USER_ADDRESSES['user3']

    sender_login_token = USER_LOGIN_TOKENS['user1']
    job_id = config['networks'][network.show_active()]['jobId']

    tx = fund_with_link(
        api_contract.address, amount=4*config["networks"][network.show_active(
        )]["fee"]
    )
    tx.wait(1)

    # Making Multiple Requests
    req_allInSystem(org_address, sender_address,
                    receiver_address, sender_login_token, job_id)
    req_isProject(org_address, sender_address,
                  receiver_address, sender_login_token, job_id)
    req_senderAuthority(org_address, sender_address,
                        receiver_address, sender_login_token, job_id)
    req_receiverAuthority(org_address, sender_address,
                          receiver_address, sender_login_token, job_id)
