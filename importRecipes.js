const admin = require('firebase-admin');
const fetch = require('node-fetch'); // If using Node 18+, you can use global fetch
const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const normalizeMealType = (mealType) => {
  if (Array.isArray(mealType)) {
    return mealType.map(type => type.toLowerCase());
  }
  return mealType.toLowerCase();
};

async function importRecipes() {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();
  const recipes = data.recipes;

  for (const recipe of recipes) {
    // Normalize mealType for Firestore queries
    recipe.mealType = normalizeMealType(recipe.mealType);

    // Remove id if you want Firestore to auto-generate it
    delete recipe.id;

    // Add to Firestore
    await db.collection('recipes').add(recipe);
    console.log(`Added recipe: ${recipe.name}`);
  }
  console.log('All recipes imported!');
  process.exit(0);
}

importRecipes().catch(console.error);