// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkinNFT is ERC721URIStorage, Ownable {

    uint256 public nextTokenId;
    mapping(address => uint256[]) public ownerTokens;

    constructor() ERC721("GameSkinNFT", "GSN") {}

    // Mint new NFT for a player
    function mint(address to, string memory uri) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        ownerTokens[to].push(tokenId);
    }

    // Transfer NFT from one player to another
    function transferSkin(address from, address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == from, "You are not the owner of this skin.");
        _transfer(from, to, tokenId);
        ownerTokens[from] = removeToken(ownerTokens[from], tokenId);
        ownerTokens[to].push(tokenId);
    }

    // Helper function to remove token ID from the list
    function removeToken(uint256[] storage tokens, uint256 tokenId) internal returns (uint256[] storage) {
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
        return tokens;
    }
}
