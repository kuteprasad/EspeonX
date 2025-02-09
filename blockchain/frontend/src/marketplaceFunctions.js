import { ethers } from "ethers";
import nftContractABI from "./EspeonXNFT.json";  

const nftContractAddress = "0x1234567890abcdef";  // Replace with deployed contract address

export const mintNFT = async (metadataURL) => {
    if (!window.ethereum) {
        alert("MetaMask is required!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, nftContractABI, signer);

    try {
        const tx = await contract.mintNFT(await signer.getAddress(), metadataURL);
        await tx.wait();
        alert("NFT Minted Successfully!");
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
};