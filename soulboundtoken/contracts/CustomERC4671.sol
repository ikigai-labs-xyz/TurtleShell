// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "./interfaces/IERC4671.sol";
import "./interfaces/IERC4671Metadata.sol";
import "./interfaces/IERC4671Enumerable.sol";

/**
 * @title CustomERC4671
 * @author Philipp Keinberger | Credits to {https://github.com/ethereum/EIPs/tree/master/assets/eip-4671}
 * @notice Custom ERC4671 Token implementation
 * @dev This token is a custom implementation from the boilerplate ERC4671 found on
 * {https://github.com/ethereum/EIPs/tree/master/assets/eip-4671}. Difference being that it allows for custom
 * storage of token URIs at each token ID, without the need for a base URI.
 */
contract CustomERC4671 is IERC4671, IERC4671Metadata, IERC4671Enumerable, ERC165 {
	// Token data
	struct Token {
		address issuer;
		address owner;
		bool valid;
		bytes _tokenURI;
	}

	// Mapping from tokenId to token
	mapping(uint256 => Token) private _tokens;

	// Mapping from owner to token ids
	mapping(address => uint256[]) private _indexedTokenIds;

	// Mapping from token id to index
	mapping(address => mapping(uint256 => uint256)) private _tokenIdIndex;

	// Mapping from owner to number of valid tokens
	mapping(address => uint256) private _numberOfValidTokens;

	// Mapping from token id to token URI
	mapping(uint256 => bytes) s_tokenURIs;

	// Token name
	string private _name;

	// Token symbol
	string private _symbol;

	// Total number of tokens emitted
	uint256 private _emittedCount;

	// Total number of token holders
	uint256 private _holdersCount;

	// Contract creator
	address private _creator;

	constructor(string memory name_, string memory symbol_) {
		_name = name_;
		_symbol = symbol_;
		_creator = msg.sender;
	}

	/// @notice Count all tokens assigned to an owner
	/// @param owner Address for whom to query the balance
	/// @return Number of tokens owned by `owner`
	function balanceOf(address owner) public view virtual override returns (uint256) {
		return _indexedTokenIds[owner].length;
	}

	/// @notice Get owner of a token
	/// @param tokenId Identifier of the token
	/// @return Address of the owner of `tokenId`
	function ownerOf(uint256 tokenId) public view virtual override returns (address) {
		return _getTokenOrRevert(tokenId).owner;
	}

	/// @notice Check if a token hasn't been revoked
	/// @param tokenId Identifier of the token
	/// @return True if the token is valid, false otherwise
	function isValid(uint256 tokenId) public view virtual override returns (bool) {
		return _getTokenOrRevert(tokenId).valid;
	}

	/// @notice Check if an address owns a valid token in the contract
	/// @param owner Address for whom to check the ownership
	/// @return True if `owner` has a valid token, false otherwise
	function hasValid(address owner) public view virtual override returns (bool) {
		return _numberOfValidTokens[owner] > 0;
	}

	/// @return Descriptive name of the tokens in this contract
	function name() public view virtual override returns (string memory) {
		return _name;
	}

	/// @return An abbreviated name of the tokens in this contract
	function symbol() public view virtual override returns (string memory) {
		return _symbol;
	}

	/// @notice URI to query to get the token's metadata
	/// @param tokenId Identifier of the token
	/// @return URI for the token
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		_getTokenOrRevert(tokenId);

		return string(_tokens[tokenId]._tokenURI);
	}

	/// @return emittedCount Number of tokens emitted
	function emittedCount() public view override returns (uint256) {
		return _emittedCount;
	}

	/// @return holdersCount Number of token holders
	function holdersCount() public view override returns (uint256) {
		return _holdersCount;
	}

	/// @notice Get the tokenId of a token using its position in the owner's list
	/// @param owner Address for whom to get the token
	/// @param index Index of the token
	/// @return tokenId of the token
	function tokenOfOwnerByIndex(
		address owner,
		uint256 index
	) public view virtual override returns (uint256) {
		uint256[] storage ids = _indexedTokenIds[owner];
		require(index < ids.length, "Token does not exist");
		return ids[index];
	}

	/// @notice Get a tokenId by it's index, where 0 <= index < total()
	/// @param index Index of the token
	/// @return tokenId of the token
	function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
		return index;
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view virtual override(ERC165, IERC165) returns (bool) {
		return
			interfaceId == type(IERC4671).interfaceId ||
			interfaceId == type(IERC4671Metadata).interfaceId ||
			interfaceId == type(IERC4671Enumerable).interfaceId ||
			super.supportsInterface(interfaceId);
	}

	/// @notice Mint a new token
	/// @param owner Address for whom to assign the token
	/// @param _tokenURI is the token URI to assign to the new token
	/// @return tokenId Identifier of the minted token
	function _mint(address owner, string memory _tokenURI) internal virtual returns (uint256 tokenId) {
		tokenId = _emittedCount;
		_mintUnsafe(owner, tokenId, true, _tokenURI);
		emit Minted(owner, tokenId);
		_emittedCount += 1;
	}

	/// @notice Mint a given tokenId
	/// @param owner Address for whom to assign the token
	/// @param tokenId Token identifier to assign to the owner
	/// @param valid Boolean to assert of the validity of the token
	function _mintUnsafe(address owner, uint256 tokenId, bool valid, string memory _tokenURI) internal {
		require(_tokens[tokenId].owner == address(0), "Cannot mint an assigned token");
		if (_indexedTokenIds[owner].length == 0) {
			_holdersCount += 1;
		}
		_tokens[tokenId] = Token(msg.sender, owner, valid, bytes(_tokenURI));
		_tokenIdIndex[owner][tokenId] = _indexedTokenIds[owner].length;
		_indexedTokenIds[owner].push(tokenId);
		if (valid) {
			_numberOfValidTokens[owner] += 1;
		}
	}

	/// @return True if the caller is the contract's creator, false otherwise
	function _isCreator() internal view virtual returns (bool) {
		return msg.sender == _creator;
	}

	/// @notice Retrieve a token or revert if it does not exist
	/// @param tokenId Identifier of the token
	/// @return The Token struct
	function _getTokenOrRevert(uint256 tokenId) internal view virtual returns (Token storage) {
		Token storage token = _tokens[tokenId];
		require(token.owner != address(0), "Token does not exist");
		return token;
	}

	/// @notice Removes an entry in an array by its index
	/// @param array Array for which to remove the entry
	/// @param index Index of the entry to remove
	function _removeFromUnorderedArray(uint256[] storage array, uint256 index) internal {
		require(index < array.length, "Trying to delete out of bound index");
		if (index != array.length - 1) {
			array[index] = array[array.length - 1];
		}
		array.pop();
	}
}
