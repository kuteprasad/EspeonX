const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
const CONTRACT_ABI = []; // Add your contract ABI here

let provider;
let signer;
let contract;

async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this dApp!');
        return;
    }

    // Setup ethers
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Setup UI elements
    const connectButton = document.getElementById('connect-button');
    connectButton.addEventListener('click', connectWallet);
    
    const mintForm = document.getElementById('mint-form');
    mintForm.addEventListener('submit', handleMint);
}

async function connectWallet() {
    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Show mint section
        document.getElementById('mint-section').classList.remove('hidden');
        
        // Update connect button
        const address = await signer.getAddress();
        document.getElementById('connect-button').textContent = 
            `Connected: ${address.slice(0,6)}...${address.slice(-4)}`;
            
        // Load existing assets
        loadAssets();
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet!');
    }
}

async function handleMint(event) {
    event.preventDefault();
    
    const name = document.getElementById('asset-name').value;
    const description = document.getElementById('asset-description').value;
    const imageFile = document.getElementById('asset-image').files[0];
    
    try {
        // Upload image to IPFS (you'll need to implement this)
        const imageUrl = await uploadToIPFS(imageFile);
        
        // Create metadata
        const metadata = {
            name,
            description,
            image: imageUrl,
            attributes: [] // Add your attributes here
        };
        
        // Upload metadata to IPFS
        const metadataUrl = await uploadToIPFS(metadata);
        
        // Mint NFT
        const tx = await contract.mintGameAsset(
            await signer.getAddress(),
            metadataUrl,
            250 // 2.5% royalty
        );
        await tx.wait();
        
        alert('Asset minted successfully!');
        loadAssets(); // Refresh assets display
    } catch (error) {
        console.error('Error minting asset:', error);
        alert('Failed to mint asset!');
    }
}

async function loadAssets() {
    const assetsGrid = document.getElementById('assets-grid');
    assetsGrid.innerHTML = '';
    
    try {
        const totalSupply = await contract.totalSupply();
        
        for (let i = 1; i <= totalSupply; i++) {
            const tokenId = i;
            const tokenUri = await contract.tokenURI(tokenId);
            const metadata = await fetch(tokenUri).then(res => res.json());
            
            const assetElement = createAssetElement(tokenId, metadata);
            assetsGrid.appendChild(assetElement);
        }
    } catch (error) {
        console.error('Error loading assets:', error);
    }
}

function createAssetElement(tokenId, metadata) {
    const div = document.createElement('div');
    div.className = 'border p-4 rounded';
    div.innerHTML = `
        <img src="${metadata.image}" alt="${metadata.name}" class="w-full h-48 object-cover mb-4">
        <h3 class="font-bold">${metadata.name}</h3>
        <p class="text-sm text-gray-600">${metadata.description}</p>
        <a href="https://opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId}" 
           target="_blank" 
           class="text-blue-500 hover:text-blue-700">
            View on OpenSea
        </a>
    `;
    return div;
}

// Initialize app
document.addEventListener('DOMContentLoaded', init);