import uuid
import jsonpickle

from flask import Flask, request, jsonify
from flask_cors import cross_origin

from DatabaseService.database import ContractDataBase
from DatabaseService.entity import ContractEntity
from DatabaseService.utils import loadBugContractEntities
from EmbeddingService.embeddingService import TextEmbeddingService
from EmbeddingService.toolUtils import cosine_similarity
from DataProcessService.nomalizer import normalizeContract
from DataProcessService.parseContract import parseContract
from PatternMatchService.patternMatcher import matchPatterns

app = Flask(__name__)

textEmbeddingService = TextEmbeddingService()

bugContractDataBase = ContractDataBase(textEmbeddingService.embedding)
loadBugContractEntities(bugContractDataBase)


@app.route('/v1/api/aduit', methods=['POST'])
@cross_origin()
def aduit():
    request_data = request.get_json()
    query_contract_text = request_data['target_contract']
    threshold = 0.9
    if 'threshold' in request_data:
        threshold = request_data['threshold']
    query_contract_tokens = parseContract(query_contract_text)
    query_contract_dict = normalizeContract(query_contract_tokens)
    contract_tokens = query_contract_dict['ContractLevelTokenization']
    function_tokens = query_contract_dict['FunctionLevelTokenization']
    statement_tokens = query_contract_dict['StatementLevelTokenization']
    contractEntity = ContractEntity(uuid.uuid4().int, contract_tokens, function_tokens, statement_tokens)
    contractEntity.embedding(textEmbeddingService.embedding)
    result = bugContractDataBase.match_fragments(contractEntity, threshold, cosine_similarity)
    vulnerability_type_set = set([detected_result['vulnerabilityType'] for detected_result in result])
    pattern_result = matchPatterns(query_contract_text)
    print(pattern_result)
    for pattern_type in pattern_result:
        if pattern_result[pattern_type] and pattern_type not in vulnerability_type_set:
            result.append({
                'vulnerabilityType': pattern_type,
                'matchFragments': [pattern_type]
            })
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8511)
