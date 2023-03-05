from typing import List

from DatabaseService.entity import ContractEntity, CompareEntity, FragmentScoreEntity


class ContractDataBase(object):
    def __init__(self, embedding_function: callable):
        self.contract_entities_map = {}
        self.embedding_function = embedding_function

    def add(self, contract_entity: ContractEntity):
        if not contract_entity.isEmbedded():
            contract_entity.embedding(self.embedding_function)
        self.contract_entities_map[contract_entity.id] = contract_entity

    def embedding(self):
        for contract_id in self.contract_entities_map:
            contract_entity = self.contract_entities_map[contract_id]
            if not contract_entity.isEmbedded():
                contract_entity.embedding(self.embedding_function)

    def search_fragments(self, query_entity: ContractEntity,
                         threshold: float,
                         scoreFunction: callable) -> List[FragmentScoreEntity]:
        fragment_score_entities = []
        for target_contract_id in self.contract_entities_map:
            target_entity = self.contract_entities_map[target_contract_id]
            compare_entity = CompareEntity(query_entity, target_entity)
            compare_entity.compare(scoreFunction)
            fragment_score_entities.extend(compare_entity.filter(threshold))
        return fragment_score_entities

    def match_fragments(self, query_entity: ContractEntity,
                        threshold: float,
                        scoreFunction: callable) -> List[FragmentScoreEntity]:
        fragment_score_entities = self.search_fragments(query_entity, threshold, scoreFunction)

        contract_id_set = set([fragment_score_entity.target_contact_id
                               for fragment_score_entity in fragment_score_entities])

        vulnerability_type_set = set([self.contract_entities_map[contract_id].vulnerabilityType
                                      for contract_id in contract_id_set])

        detected_vulnerability ={}
        detected_result = []
        for vulnerability_type in vulnerability_type_set:
            if vulnerability_type is not None:
                detected_vulnerability[vulnerability_type] = set()

        for fragment_score_entity in fragment_score_entities:
            target_contract_id = fragment_score_entity.target_contact_id
            target_contract = self.contract_entities_map[target_contract_id]
            vulnerability_type = target_contract.vulnerabilityType
            fragment_type = fragment_score_entity.fragment
            if vulnerability_type is not None and fragment_type == 'function':
                # match_fragment = {}
                source_fragment_id = fragment_score_entity.query_fragment_id
                source_fragment = query_entity.getFragmentToken(fragment_type, source_fragment_id)
                # target_fragment_id = fragment_score_entity.target_fragment_id
                # target_fragment = target_contract.getFragmentToken(fragment_type, target_fragment_id)
                # match_fragment['sourceFragment'] = source_fragment
                # match_fragment['matchedFragment'] = target_fragment
                detected_vulnerability[vulnerability_type].add(source_fragment)

        for vulnerability_type in vulnerability_type_set:
            if vulnerability_type is not None and len(detected_vulnerability[vulnerability_type]) > 0:
                detected_result.append({
                    'vulnerabilityType': vulnerability_type,
                    'matchFragments': list(detected_vulnerability[vulnerability_type])
                })

        return detected_result



