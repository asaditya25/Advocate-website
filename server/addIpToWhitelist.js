require('dotenv').config();
const axios = require('axios');

const publicKey = process.env.ATLAS_PUBLIC_KEY;
const privateKey = process.env.ATLAS_PRIVATE_KEY;
const projectId = process.env.ATLAS_PROJECT_ID;

async function addIpToWhitelist() {
  if (!publicKey || !privateKey || !projectId) {
    console.error('Missing Atlas API credentials in .env file.');
    console.error('Please set ATLAS_PUBLIC_KEY, ATLAS_PRIVATE_KEY, and ATLAS_PROJECT_ID in your .env file.');
    return;
  }

  try {
    // Get current public IP
    console.log('Getting current public IP...');
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ip = ipResponse.data.ip;
    console.log(`Current IP: ${ip}`);

    // Add IP to Atlas whitelist
    const url = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${projectId}/accessList`;
    const auth = {
      username: publicKey,
      password: privateKey
    };
    
    console.log('Adding IP to MongoDB Atlas whitelist...');
    await axios.post(url, [{ ipAddress: ip }], { auth });
    console.log(`✅ Successfully added IP ${ip} to MongoDB Atlas whitelist`);
  } catch (error) {
    console.error('❌ Error adding IP to whitelist:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

addIpToWhitelist().catch(error => {
  console.error('Failed to add IP to whitelist:', error.message);
  process.exit(1);
});
