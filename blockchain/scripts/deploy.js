// const hre = require("hardhat");
// const MetadataHandler = require('./metadata');

// async function main() {
//     // Deploy the contract
//     const GameAsset = await hre.ethers.getContractFactory("OpenSeaGameAsset");
//     const gameAsset = await GameAsset.deploy(
//         "YourGameName",
//         "GAME",
//         "ipfs://your-base-uri/",
//         "ipfs://your-contract-metadata/"
//     );
//     await gameAsset.deployed();

//     console.log("GameAsset deployed to:", gameAsset.address);

//     // Create metadata handler
//     const metadataHandler = new MetadataHandler();

//     // Example: Mint first asset
//     const imageIPFS = await metadataHandler.uploadImageToIPFS('./assets/example.png');
    
//     const metadata = metadataHandler.createMetadata(
//         "Epic Sword",
//         "A legendary sword forged in the depths of the digital realm",
//         imageIPFS,
//         [
//             { trait_type: "Rarity", value: "Legendary" },
//             { trait_type: "Damage", value: 150, max_value: 200 },
//             { trait_type: "Level", value: 20 },
//             { trait_type: "Element", value: "Fire" }
//         ]
//     );

//     const metadataURI = await metadataHandler.uploadMetadataToIPFS(metadata);
    
//     // Mint the NFT
//     const tx = await gameAsset.mintGameAsset(
//         "0xYourAddress", // Replace with recipient address
//         metadataURI,
//         250 // 2.5% royalty
//     );
//     await tx.wait();

//     console.log("First asset minted!");
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });




// const hre = require("hardhat");

// async function main() {
//   const EspeonNFT = await hre.ethers.getContractFactory("EspeonNFT");
//   const nft = await EspeonNFT.deploy();
//   await nft.deployed();

//   console.log("NFT Contract deployed to:", nft.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const hre = require("hardhat");

async function main() {
  const SkinNFT = await hre.ethers.getContractFactory("SkinNFT");
  const nft = await SkinNFT.deploy(); // No need for .deployed()

  console.log("NFT Contract deployed to:", nft.target); // Use .target instead of .address in Hardhat v6+
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const EspeonToken = await hre.ethers.getContractFactory("EspeonToken");
  const espeonToken = await EspeonToken.deploy(1000000); // 1 million tokens
  await espeonToken.deployed();
  console.log("EspeonToken deployed to:", espeonToken.address);

  const EspeonDAO = await hre.ethers.getContractFactory("EspeonDAO");
  const espeonDAO = await EspeonDAO.deploy(espeonToken.address);
  await espeonDAO.deployed();
  console.log("EspeonDAO deployed to:", espeonDAO.address);

  const RevenueSharing = await hre.ethers.getContractFactory("RevenueSharing");
  const revenueSharing = await RevenueSharing.deploy(espeonToken.address);
  await revenueSharing.deployed();
  console.log("RevenueSharing deployed to:", revenueSharing.address);

  const Tournament = await hre.ethers.getContractFactory("Tournament");
  const tournament = await Tournament.deploy(espeonToken.address);
  await tournament.deployed();
  console.log("Tournament deployed to:", tournament.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
