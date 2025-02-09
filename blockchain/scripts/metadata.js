const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

class MetadataHandler {
    constructor() {
        this.pinataApiKey = process.env.PINATA_API_KEY;
        this.pinataSecretKey = process.env.PINATA_SECRET_KEY;
    }

    async uploadImageToIPFS(imagePath) {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    pinata_api_key: this.pinataApiKey,
                    pinata_secret_api_key: this.pinataSecretKey
                }
            });
            return `ipfs://${res.data.IpfsHash}`;
        } catch (error) {
            console.error("Error uploading image to IPFS:", error);
            throw error;
        }
    }

    async uploadMetadataToIPFS(metadata) {
        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
                headers: {
                    pinata_api_key: this.pinataApiKey,
                    pinata_secret_api_key: this.pinataSecretKey
                }
            });
            return `ipfs://${res.data.IpfsHash}`;
        } catch (error) {
            console.error("Error uploading metadata to IPFS:", error);
            throw error;
        }
    }

    createMetadata(name, description, image, attributes) {
        return {
            name,
            description,
            image,
            attributes
        };
    }
}

module.exports = MetadataHandler;