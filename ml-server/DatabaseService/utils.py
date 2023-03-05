import json
import os
import uuid
from typing import List, Dict

from DatabaseService.database import ContractDataBase
from DatabaseService.entity import ContractEntity

RESOURCE_PATH = os.path.join(os.path.dirname(__file__), '../resources/normalizedTokens')


def convertToContractEntity(tokens_dict: Dict[str, List[str]], vulnerabilityType: str):
    contract_tokens = tokens_dict['ContractLevelTokenization']
    function_tokens = tokens_dict['FunctionLevelTokenization']
    statement_tokens = tokens_dict['StatementLevelTokenization']
    contractEntity = ContractEntity(uuid.uuid4().int, contract_tokens, function_tokens, statement_tokens, vulnerabilityType)
    return contractEntity


def loadBugContractEntities(bugContractDataBase: ContractDataBase):
    i = 0
    assert os.path.exists(RESOURCE_PATH)
    for file_type in os.listdir(RESOURCE_PATH):
        folder_path = os.path.join(RESOURCE_PATH, file_type)
        for filename in os.listdir(folder_path):
            with open(os.path.join(folder_path, filename), 'r') as f:
                tokens_dict = json.load(f)
                contractEntity = convertToContractEntity(tokens_dict, vulnerabilityType=file_type)
                bugContractDataBase.add(contractEntity)
                i+=1
    print("Loaded ", i, " smart contracts")


if __name__ == '__main__':

    bugContractDataBase = ContractDataBase(lambda x: [[1,2,3] for _ in range(len(x))])
    loadBugContractEntities(bugContractDataBase)
