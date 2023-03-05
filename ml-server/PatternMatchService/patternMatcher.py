import json
import os
import re
import uuid

def remove_comments(string):
    pattern = r"(\".*?\"|\'.*?\')|(/\*.*?\*/|//[^\r\n]*$)"
    # first group captures quoted strings (double or single)
    # second group captures comments (//single-line or /* multi-line */)
    regex = re.compile(pattern, re.MULTILINE|re.DOTALL)
    def _replacer(match):
        # if the 2nd group (capturing comments) is not None,
        # it means we have captured a non-quoted (real) comment string.
        if match.group(2) is not None:
            return "" # so we will return empty to remove the comment
        else: # otherwise, we will return the 1st group
            return match.group(1) # captured quoted-string
    return regex.sub(_replacer, string)

def match_delegate_call(content):
    regcontent = r'.delegatecall'
    contentre = re.compile(regcontent)
    matched = re.findall(contentre, content)
    return len(matched) > 0


def match_timestamp(content):
    regcontent = r'block.timestamp'
    contentre = re.compile(regcontent)
    matched = re.findall(contentre, content)
    return len(matched) > 0

def match_reentrancy(content):
    regcontent = r'call.value'
    contentre = re.compile(regcontent)
    matched = re.findall(contentre, content)
    return len(matched) > 0

def matchPatterns(content):
    content = remove_comments(content)
    return {
        "delegatecall": match_delegate_call(content),
        "timestamp": match_timestamp(content),
        "reentrancy": match_reentrancy(content)
    }

if __name__ == "__main__":
    contract_path = '../resources/contracts/vulnerable/delegatecall/317.sol'
    with open(contract_path, 'r') as f:
        contract = f.read()
    result = matchPatterns(remove_comments(contract))
