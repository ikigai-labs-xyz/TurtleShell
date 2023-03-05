import uuid
from typing import List, Dict


class ScoreEntity(object):
    def __init__(self, query_id: int, target_id: int, score: float):
        self.query_id = query_id
        self.target_id = target_id
        self.score = score


class FragmentEntity(object):
    def __init__(self, id: int, token: str, vector: List[float]):
        self.id = id
        self.token = token
        self.vector = vector

    def isEmbedded(self) -> bool:
        return self.vector is not None

    def score(self, query_vector: List[float], score_function: callable) -> float:
        assert self.isEmbedded() and len(self.vector) == len(query_vector)
        return score_function(self.vector, query_vector)


class FragmentEntities(object):
    def __init__(self, fragment_tokens: List[str]):
        self.fragment_entities = [FragmentEntity(idx, token, None) for idx, token in enumerate(fragment_tokens)]

    def embedding(self, embedding_function: callable):
        fragment_tokens = [fragment_entity.token for fragment_entity in self.fragment_entities]
        fragment_vectors = embedding_function(fragment_tokens)
        for fragment_entity in self.fragment_entities:
            fragment_entity.vector = fragment_vectors[fragment_entity.id]

    def isEmbedded(self) -> bool:
        for fragment_entity in self.fragment_entities:
            if not fragment_entity.isEmbedded():
                return False
        return True

    def compare(self, query_fragment: FragmentEntity, score_function: callable) -> List[ScoreEntity]:
        score_entities = []
        assert query_fragment.isEmbedded() and self.isEmbedded()
        for fragment_entity in self.fragment_entities:
            score = fragment_entity.score(query_fragment.vector, score_function)
            score_entities.append(ScoreEntity(query_fragment.id, fragment_entity.id, score))
        return score_entities


class ContractEntity(object):

    def __init__(self, id: int, contract_tokens: List[str], function_tokens: List[str],
                 statement_tokens: List[str], vulnerabilityType: str = None):
        self.id = id
        self.contract_fragments = FragmentEntities(contract_tokens)
        self.function_fragments = FragmentEntities(function_tokens)
        self.statement_fragments = FragmentEntities(statement_tokens)
        self.vulnerabilityType = vulnerabilityType

    def embedding(self, embedding_function: callable):
        self.contract_fragments.embedding(embedding_function)
        self.function_fragments.embedding(embedding_function)
        self.statement_fragments.embedding(embedding_function)

    def isEmbedded(self) -> bool:
        return self.contract_fragments.isEmbedded() and \
               self.function_fragments.isEmbedded() and \
               self.statement_fragments.isEmbedded()

    def getFragmentToken(self, fragment_type: str, fragment_id: int):
        if fragment_type == 'contract':
            return self.contract_fragments.fragment_entities[fragment_id].token
        elif fragment_type == 'function':
            return self.function_fragments.fragment_entities[fragment_id].token
        elif fragment_type == 'statement':
            return self.statement_fragments.fragment_entities[fragment_id].token
        else:
            raise ValueError('Invalid fragment type: ' + fragment_type)


class FragmentScoreEntity(object):
    def __init__(self, query_contact_id: int, query_fragment_id: int, target_contact_id: int, target_fragment_id,
                 score: float, fragment: str):
        self.query_contact_id = query_contact_id
        self.query_fragment_id = query_fragment_id
        self.target_contact_id = target_contact_id
        self.target_fragment_id = target_fragment_id
        self.score = score
        self.fragment = fragment


class CompareEntity(object):
    def __init__(self, query_contract: ContractEntity, target_contract: ContractEntity):
        assert query_contract.isEmbedded() and target_contract.isEmbedded()
        self.id = uuid.uuid4().int
        self.query_contract = query_contract
        self.target_contract = target_contract
        self.contract_score_entities = None
        self.function_score_entities = None
        self.statement_score_entities = None

    def compare(self, score_function: callable):
        def score_fragments(query_fragments: FragmentEntities, target_fragments: FragmentEntities):
            score_entities = []
            for query_fragment in query_fragments.fragment_entities:
                score_entities += target_fragments.compare(query_fragment, score_function)
            return score_entities

        self.contract_score_entities = score_fragments(self.query_contract.contract_fragments,
                                                       self.target_contract.contract_fragments)
        self.function_score_entities = score_fragments(self.query_contract.function_fragments,
                                                       self.target_contract.function_fragments)
        self.statement_score_entities = score_fragments(self.query_contract.statement_fragments,
                                                        self.target_contract.statement_fragments)

    def filter(self, threshold: float) -> List[FragmentScoreEntity]:
        def filter_score_entities(score_entities: List[ScoreEntity]):
            return [score_entity for score_entity in score_entities if score_entity.score >= threshold]

        filtered_contract_score_entities = filter_score_entities(self.contract_score_entities)
        filtered_function_score_entities = filter_score_entities(self.function_score_entities)
        filtered_statement_score_entities = filter_score_entities(self.statement_score_entities)
        fragment_score_entities = []
        filtered_dict = {"contract": filtered_contract_score_entities,
                         "function": filtered_function_score_entities,
                         "statement": filtered_statement_score_entities}
        for fragment in filtered_dict.keys():
            score_entities = filtered_dict[fragment]
            for score_entity in score_entities:
                fragment_score_entities.append(FragmentScoreEntity(self.query_contract.id, score_entity.query_id,
                                                                   self.target_contract.id, score_entity.target_id,
                                                                   score_entity.score, fragment))

        return fragment_score_entities

    def overall_score(self) -> float:
        return sum([score_entity.score * (1 / len(self.contract_score_entities)) for score_entity in
                    self.contract_score_entities]) + \
               sum([score_entity.score * (1 / len(self.function_score_entities)) for score_entity in
                    self.function_score_entities]) + \
               sum([score_entity.score * (1 / len(self.statement_score_entities)) for score_entity in
                    self.statement_score_entities])

    def isSimilar(self, threshold: float) -> bool:
        return self.overall_score() >= threshold

    def hasSimilarFragment(self, threshold: float) -> bool:
        for score_entity in self.contract_score_entities + self.function_score_entities + self.statement_score_entities:
            if score_entity.score >= threshold:
                return True
        return False
