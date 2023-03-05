from toolUtils import cosine_similarity
from EmbeddingService.embeddingService import TextEmbeddingService
import json
import numpy as np

textEmbeddingService = TextEmbeddingService()

# Load normalized tokens from file
with open('../tokenizer/ast/OverflowContractNormalizedTokens.json', 'r') as f:
    bug_normalized_tokens_dict = json.load(f)

with open('../tokenizer/ast/Overflow_2.json', 'r') as f:
    contract_normalized_tokens_dict = json.load(f)

bug_normalized_tokens = []
contract_normalized_tokens = []

for level, tokens in bug_normalized_tokens_dict.items():
    assert isinstance(tokens, list)
    bug_normalized_tokens += tokens

for level, tokens in contract_normalized_tokens_dict.items():
    assert isinstance(tokens, list)
    contract_normalized_tokens += tokens


def embedding_normalized_tokens(normalized_tokens):
    assert isinstance(normalized_tokens, list)
    embedding_matrix = textEmbeddingService.embedding(normalized_tokens)
    return np.array(embedding_matrix)


bug_embedding_matrix = embedding_normalized_tokens(bug_normalized_tokens)
contract_embedding_matrix = embedding_normalized_tokens(contract_normalized_tokens)

print("Bug normalized tokens: ", len(bug_normalized_tokens))
print("Contract normalized tokens: ", len(contract_normalized_tokens))
print("Bug EmbeddingService matrix: ", bug_embedding_matrix.shape)
print("Contract EmbeddingService matrix: ", contract_embedding_matrix.shape)

for i in range(len(bug_embedding_matrix)):
    for j in range(len(contract_embedding_matrix)):
        similarity = cosine_similarity(bug_embedding_matrix[i], contract_embedding_matrix[j])
        print("Similarity: ", similarity)
        print("Bug token: ", bug_normalized_tokens[i])
        print("Contract token: ", contract_normalized_tokens[j])
        print("-*-*" * 50)
