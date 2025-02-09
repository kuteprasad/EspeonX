import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ethers } from "ethers";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const CONTRACT_ADDRESS = "0x2ADdBE2bAaf5B9D18328a1BCc918ec14BDc6a384";

  const assets = [
    { id: 1, name: "Epic Sword", price: "0.000", image: "/weapons/1.jpeg" },
    { id: 2, name: "Mystic Shield", price: "0.008", image: "/weapons/2.jpeg" },
    { id: 3, name: "Dragon Helmet", price: "0.012", image: "/weapons/3.jpeg" },
    { id: 4, name: "Fire Bow", price: "0.07", image: "/weapons/4.jpeg" },
    { id: 5, name: "Stealth Boots", price: "0.004", image: "/weapons/5.jpeg" },
    { id: 6, name: "Thunder Axe", price: "0.005", image: "/weapons/6.jpeg" },
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

      const network = await provider.getNetwork();
      if (network.name !== "sepolia") {
        alert("Please switch to the Sepolia test network in MetaMask");
        setLoading(false);
        return;
      }

      const balance = await signer.getBalance();
      const balanceInEth = ethers.utils.formatEther(balance);
      const nftPrice = parseFloat(asset.price);

      if (parseFloat(balanceInEth) < nftPrice) {
        alert(`Insufficient funds. You need at least ${nftPrice} ETH.`);
        setLoading(false);
        return;
      }

      const tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(asset.price),
        gasLimit: ethers.utils.hexlify(100000),
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
            className="bg-gray-800 text-white px-6 py-3 pl-12 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>

        <button
          onClick={() => window.open("https://opensea.io", "_blank")}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md transition-all"
        >
          Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-gray-800 p-4 rounded-md shadow-lg transition-all transform hover:scale-105 hover:shadow-xl border border-gray-700"
          >
            <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
              {asset.name}
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-lg font-semibold">{asset.name}</span>
              <span className="text-lime-400 font-bold">{asset.price} ETH</span>
            </div>
            <button
              onClick={() => buyNFT(asset)}
              disabled={loading}
              className={`mt-4 w-full py-2 rounded-md transition-all ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600 text-black"
              }`}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
