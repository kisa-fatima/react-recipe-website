const admin = require('firebase-admin');
const path = require('path');

// Path to your Firebase service account key
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Import cuisinesData from your local file
const { cuisinesData } = require(path.resolve(__dirname, 'src/utils/cusinesData.js'));

async function importCuisines() {
  for (const cuisine of cuisinesData) {
    // Add to Firestore
    await db.collection('cuisines').add(cuisine);
    console.log(`Added cuisine: ${cuisine.name}`);
  }
  console.log('All cuisines imported!');
  process.exit(0);
}

importCuisines().catch(console.error);