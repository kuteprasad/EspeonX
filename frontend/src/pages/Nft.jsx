import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

function Nft() {
    const [nfts, setNfts] = useState([]);
    const CONTRACT_ADDRESS = "0x2ADdBE2bAaf5B9D18328a1BCc918ec14BDc6a384"; // Replace with your deployed NFT contract address

    // Fetch NFTs from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/nfts")
            .then((response) => {
                setNfts(response.data.data);
            })
            .catch((error) => console.error("Error fetching NFTs:", error));
    }, []);

    // Buy NFT using MetaMask
    const buyNFT = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = provider.getSigner();

            // Get the current network (to ensure we're on Sepolia)
            const network = await provider.getNetwork();
            if (network.name !== "sepolia") {
                alert("Please switch to the Sepolia test network in MetaMask.");
                return;
            }

            // Get the user's balance in Wei (lowest unit of ETH)
            const balance = await signer.getBalance();
            const balanceInEth = ethers.utils.formatEther(balance);
            console.log("Your balance in ETH:", balanceInEth);

            // Price of the NFT (in ETH)
            const nftPrice = 0.0001; // 0.1 ETH

            // Check if the user has enough funds for the NFT and gas
            if (parseFloat(balanceInEth) < nftPrice) {
                alert(`Insufficient funds to buy NFT. You need at least ${nftPrice} ETH.`);
                return;
            }

            // Proceed with transaction to buy the NFT
            const tx = await signer.sendTransaction({
                to: CONTRACT_ADDRESS,
                value: ethers.utils.parseEther(String(nftPrice)), // Price of NFT in ETH
                gasLimit: ethers.utils.hexlify(100000) // Set a reasonable gas limit (adjust if needed)
            });

            await tx.wait(); // Wait for the transaction to be mined
            alert("NFT Purchased Successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed");
        }
    };

    return (
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            {nfts.map((nft) => (
                <div key={nft.id} className="p-4 border rounded-lg shadow-lg">
                    <img src={nft.image} alt={nft.name} className="h-40 object-contain w-full" />
                    <h3 className="text-lg font-bold mt-2">{nft.name}</h3>
                    <p className="text-gray-600">{nft.price} ETH</p>
                    <button
                        onClick={buyNFT}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition"
                    >
                        Buy NFT
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Nft;
