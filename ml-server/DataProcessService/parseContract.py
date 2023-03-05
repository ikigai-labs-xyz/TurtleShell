import requests

API_ENDPOINT = "http://localhost:8512/v1/api/parse"

def parseContract(contract):
    data = { "target_contract": contract}
    reponse = requests.post(url = API_ENDPOINT, json = data)
    if reponse.status_code != 200:
        raise Exception("parseContract failed")
    tokens = reponse.json()
    return tokens