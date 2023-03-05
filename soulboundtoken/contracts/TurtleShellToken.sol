// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./CustomERC4671.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error TurtleShellToken__InvalidSignature();
error TurtleShellToken__SignatureAlreadyUsed();

/**
 * @title TurtleShellToken
 * @author Philipp Keinberger
 * @notice Non-Transferable-Token that allows for minting automated Audit badges
 * @dev This contract is an implementation of the `CustomERC4671` token. It allows
 * audit recipients to mint their soul bound tokens (audit badges).
 */
contract TurtleShellToken is CustomERC4671, EIP712, Ownable {
	using ECDSA for bytes32;

	/**
	 * @dev Defines the data structure for a mint request
	 * @param to is the mint receiver
	 * @param tokenURI is the token URI of the NFT
	 */
	struct MintRequest {
		address to;
		string tokenURI;
	}

	bytes32 private constant MINTREQUEST_TYPEHASH = keccak256("MintRequest(address to,string tokenURI)");

	/// @dev signature => already used
	mapping(bytes => bool) s_usedSignatures;

	constructor(string memory name, string memory symbol) CustomERC4671(name, symbol) EIP712(name, "1") {}

	/**
	 * @notice Function for minting soul bound tokens
	 * @param mintRequest is the mint request data
	 * @param signature is the signature of the `mintRequest` signed by the owner
	 * @dev The mint gets only executed if the `mintRequest` has been signed by the owner of the
	 * contract.
	 *
	 * This function reverts if the signature has already been used before.
	 *
	 * This function reverts if the signature provided is faulty (e.g. not signed by the owner, or
	 * false data signed).
	 */
	function mint(MintRequest calldata mintRequest, bytes calldata signature) external {
		if (!_verifyMintRequest(mintRequest, signature, owner())) revert TurtleShellToken__InvalidSignature();
		if (s_usedSignatures[signature]) revert TurtleShellToken__SignatureAlreadyUsed();

		s_usedSignatures[signature] = true;
		_mint(mintRequest.to, string(mintRequest.tokenURI));
	}

	/**
	 * @notice Function for verifying a mint request signature
	 * @param mintRequest is the mint request data
	 * @param signature is the signature of the `mintRequest` signed by the owner
	 * @param signer is the expected signer address of `mintReuqest` (owner)
	 * @return bool if address used to sign `mintRequest` matches `signer`
	 * @dev The function recovers the address used to sign `mintRequest` using Openzeppelin's ECDSA
	 * library. It returns if the recovereed address matches `signer`.
	 */
	function _verifyMintRequest(
		MintRequest calldata mintRequest,
		bytes calldata signature,
		address signer
	) internal view returns (bool) {
		return _hashTypedDataV4(keccak256(_encodeMintRequest(mintRequest))).recover(signature) == signer;
	}

	/**
	 * @notice Function for encoding a mint request
	 * @param mintRequest is the mint request data
	 * @return bytes encoded mint request data
	 */
	function _encodeMintRequest(MintRequest calldata mintRequest) internal pure returns (bytes memory) {
		return
			abi.encode(
				MINTREQUEST_TYPEHASH,
				mintRequest.to,
				keccak256(abi.encodePacked(mintRequest.tokenURI))
			);
	}
}
