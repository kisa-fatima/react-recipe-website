import { collection, getDocs, query, limit, startAfter, orderBy, doc, getDoc, addDoc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { cuisinesData } from "../utils/cusinesData";

/**
 * Fetch all recipes (paginated).
 * @param {number} limit - Number of recipes to fetch.
 * @param {number} skip - Number of recipes to skip.
 */
export const fetchAllRecipes = async (limitNum = 20, lastVisible = null) => {
  try {
    let q = query(collection(db, 'recipes'), orderBy('name'), limit(limitNum));
    if (lastVisible) {
      q = query(collection(db, 'recipes'), orderBy('name'), startAfter(lastVisible), limit(limitNum));
    }
    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

/**
 * Fetch a single recipe by ID.
 * @param {number} id - The recipe ID.
 */
export const fetchRecipeById = async (id) => {
  try {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Search recipes by name.
 * @param {string} query - Search keyword.
 */
export const searchRecipes = async (searchQuery) => {
  try {
    const q = query(collection(db, 'recipes'), orderBy('name'));
    const snapshot = await getDocs(q);
    const recipes = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return recipes;
  } catch (error) {
    console.error(`Error searching for recipes with query "${searchQuery}":`, error);
    return [];
  }
};

/**
 * Filter recipes by cuisine type.
 * @param {string} cuisine - Cuisine type (e.g., "Italian", "Indian")
 */
export const filterRecipesByCuisine = async (cuisine) => {
  try {
    const q = query(collection(db, 'recipes'), where('cuisine', '==', cuisine));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error filtering recipes by cuisine "${cuisine}":`, error);
    return [];
  }
};

/**
 * Fetch all recipe cuisine types.
 * @returns {Promise<string[]>} - Array of unique cuisine types.
 */
export const fetchRecipeCusineTypes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'cuisines'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting recipe cuisines:`, error);
    return [];
  }
};

/** * Fetch details of a specific cuisine.
 * @param {string} cuisine - Cuisine name (e.g., "Italian", "Indian")
 * @returns {Promise<Object|null>} - Cuisine details or null if not found.
 */
export const fetchCusineDetails = async (cuisine) => {
  try {
    const q = query(collection(db, 'cuisines'), where('name', '==', cuisine));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching cuisine details for "${cuisine}":`, error);
    return null;
  }
};

/**
 * Filter recipes by meal type.
 * @param {string} mealType - Meal type (e.g., "breakfast", "lunch", "dinner")
 * @returns {Promise<Object[]>} - Array of recipe objects.
 */
export const filterRecipesByMealType = async (mealType) => {
  try {
    const q = query(collection(db, 'recipes'), where('mealType', 'array-contains', mealType.toLowerCase()));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error filtering recipes by meal type "${mealType}":`, error);
    return [];
  }
};

/**
 * Add a new recipe.
 * @param {Object} recipeData - Recipe object to add.
 */
export const addRecipe = async (recipeData) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipeData);
    return { id: docRef.id, ...recipeData };
  } catch (error) {
    console.error('Error adding recipe:', error);
    return null;
  }
};

/**
 * Update a recipe by ID.
 * @param {number} id - Recipe ID to update.
 * @param {Object} updatedData - Updated recipe fields.
 */
export const updateRecipe = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'recipes', id);
    await updateDoc(docRef, updatedData);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Add a new cuisine type locally (simulate since API doesn't exist).
 * @param {Object} cuisineData - New cuisine object.
 */
export const addCuisine = async (cuisineData) => {
  try {
    const docRef = await addDoc(collection(db, 'cuisines'), cuisineData);
    return { id: docRef.id, ...cuisineData };
  } catch (error) {
    console.error('Error adding cuisine:', error);
    return null;
  }
};

/**
 * Update a cuisine by name (simulate locally).
 * @param {string} cuisineName - Cuisine name to update.
 * @param {Object} updatedData - New values to update.
 */
export const updateCuisine = async (cuisineName, updatedData) => {
  try {
    const q = query(collection(db, 'cuisines'), where('name', '==', cuisineName));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, updatedData);
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error updating cuisine "${cuisineName}":`, error);
    return null;
  }
};

/**
 * Delete a recipe by ID.
 * @param {number} id - The ID of the recipe to delete.
 * @returns {Promise<Object|null>} - Deleted recipe data or null if failed.
 */
export const deleteRecipe = async (id) => {
  try {
    const docRef = doc(db, 'recipes', id);
    await deleteDoc(docRef);
    return { id };
  } catch (error) {
    console.error(`Error deleting recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Delete a cuisine by name (simulated locally).
 * @param {string} cuisineName - The name of the cuisine to delete.
 * @returns {boolean} - True if deleted, false otherwise.
 */
export const deleteCuisine = async (cuisineName) => {
  try {
    const q = query(collection(db, 'cuisines'), where('name', '==', cuisineName));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await deleteDoc(docRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting cuisine "${cuisineName}":`, error);
    return false;
  }
};

