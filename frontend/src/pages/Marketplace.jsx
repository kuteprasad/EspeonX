import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ethers } from "ethers";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const CONTRACT_ADDRESS = "0x2ADdBE2bAaf5B9D18328a1BCc918ec14BDc6a384";

  const assets = [
    { id: 1, name: "Epic Sword", price: "0.000", image: "/assets/sword.png" },
    { id: 2, name: "Mystic Shield", price: "0.008", image: "/assets/shield.png" },
    { id: 3, name: "Dragon Helmet", price: "0.012", image: "/assets/helmet.png" },
    { id: 4, name: "Fire Bow", price: "0.07", image: "/assets/bow.png" },
    { id: 5, name: "Stealth Boots", price: "0.004", image: "/assets/boots.png" },
    { id: 6, name: "Thunder Axe", price: "0.005", image: "/assets/axe.png" },
  ];

  const buyNFT = async (asset) => {
    if (!window.ethereum) {
      alert("Please install MetaMask to purchase NFTs");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();

      // Check network
      const network = await provider.getNetwork();
      if (network.name !== "sepolia") {
        alert("Please switch to the Sepolia test network in MetaMask");
        setLoading(false);
        return;
      }

      // Check balance
      const balance = await signer.getBalance();
      const balanceInEth = ethers.utils.formatEther(balance);
      const nftPrice = parseFloat(asset.price);

      if (parseFloat(balanceInEth) < nftPrice) {
        alert(`Insufficient funds. You need at least ${nftPrice} ETH to purchase this NFT`);
        setLoading(false);
        return;
      }

      // Execute purchase
      const tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(asset.price),
        gasLimit: ethers.utils.hexlify(100000)
      });

      alert("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      alert(`Successfully purchased ${asset.name}!`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="relative mt-8">
          <input
            type="text"
            placeholder="Search assets..."
            className="bg-gray-800 text-white px-6 py-3 pl-12 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-lime-500 border-2 border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-6xl">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-gray-800 p-6 rounded-3xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer hover:border-lime-500 border-2 border-gray-700"
          >
            <div className="w-full h-48 bg-gray-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              {asset.name}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold">{asset.name}</span>
              <span className="text-lime-400 font-bold">{asset.price} ETH</span>
            </div>
            <button 
              onClick={() => buyNFT(asset)}
              disabled={loading}
              className={`mt-6 w-full py-3 rounded-xl transition-all ${
                loading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-lime-500 hover:bg-lime-600 text-black'
              }`}
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
