import json
import re

def normalize_token(token):
    """Normalize a single token by removing differences"""
    # Remove stop words
    stop_words = ['internal', 'public', 'external', 'view', 'pure', 'payable', 'returns', 'constant', 'undefined']
    if token in stop_words:
        return ''
    # Normalize number literals
    if isinstance(token, int):
        return '0'
    # Normalize string literals
    if isinstance(token, str) and token.startswith('"') and token.endswith('"'):
        return '""'
    # Normalize boolean literals
    if isinstance(token, bool):
        return 'bool'
    # Normalize array literals
    if isinstance(token, list):
        return '[]'
    # Normalize tuple expressions
    if isinstance(token, tuple):
        return '()'
    return token

def normalize_token_stream(token_stream):
    # Remove all comments and whitespace
    token_stream = [re.sub('//.*', '', token) for token in token_stream]
    token_stream = [re.sub('/\*.*?\*/', '', token, flags=re.S) for token in token_stream]
    token_stream = [token.strip() for token in token_stream if token.strip()]
    # Replace all integer and decimal literals with a single placeholder token
    token_stream = [re.sub(r'\d+\.\d+|\d+', 'DecimalNumber', token) for token in token_stream]
    # Replace all string literals with a single placeholder token
    token_stream = [re.sub(r'"([^"\\]|\\.)*"', 'StringLiteral', token) for token in token_stream]
    return token_stream


def normalizeContract(contract_tokens):
    normalized_tokens = {}
    for level, token_stream in contract_tokens.items():
        if not isinstance(token_stream, list):
            token_stream = [token_stream]
        normalized_tokens[level] = normalize_token_stream(token_stream)
    return normalized_tokens
