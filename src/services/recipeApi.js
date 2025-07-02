import { cuisinesData } from "../utils/cusinesData";
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/recipes';

/**
 * Fetch all recipes (paginated).
 * @param {number} limit - Number of recipes to fetch.
 * @param {number} skip - Number of recipes to skip.
 */
export const fetchAllRecipes = async (limit = 20, skip = 0) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data.recipes; // returns an array
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
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Search recipes by name.
 * @param {string} query - Search keyword.
 */
export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error(`Error searching for recipes with query "${query}":`, error);
    return [];
  }
};

/**
 * Filter recipes by cuisine type.
 * @param {string} cuisine - Cuisine type (e.g., "Italian", "Indian")
 */
export const filterRecipesByCuisine = async (cuisine) => {
  try {
    const allRecipes = await fetchAllRecipes(100); // dummyjson doesn't support filtering directly
    return allRecipes.filter(recipe =>
      recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  } catch (error) {
    console.error(`Error filtering recipes by cuisine "${cuisine}":`, error);
    return [];
  }
};


/**
 * Fetch all recipe cuisine types.
 * @returns {Promise<string[]>} - Array of unique cuisine types.
 */
export  const fetchRecipeCusineTypes = async () => {
 try {
    const allCuisines = [...cuisinesData]; // dummyjson doesn't support filtering directly
    return allCuisines;
  } catch (error) {
    console.error(`Error getting recipe cuisines:`, error);
    return [];
  }
}

/** * Fetch details of a specific cuisine.
 * @param {string} cuisine - Cuisine name (e.g., "Italian", "Indian")
 * @returns {Promise<Object|null>} - Cuisine details or null if not found.
 */
export const fetchCusineDetails = async (cuisine) => {
  try {
    const allCuisines = await fetchRecipeCusineTypes();
    return allCuisines.find(c => c.name.toLowerCase() === cuisine.toLowerCase());
  } catch (error) {
    console.error(`Error fetching cuisine details for "${cuisine}":`, error);
    return null;
  }
}

/**
 * Filter recipes by meal type.
 * @param {string} mealType - Meal type (e.g., "breakfast", "lunch", "dinner")
 * @returns {Promise<Object[]>} - Array of recipe objects.
 */
export const filterRecipesByMealType = async (mealType) => {
  try {
    const response = await fetch(`${BASE_URL}/meal-type/${mealType.toLowerCase()}`);
    const data = await response.json();
    return data.recipes || []; // in case the response is empty
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
    const response = await axios.post(`${BASE_URL}/add`, recipeData);
    return response.data;
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
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
    // Fallback: simulate local update for non-persisted recipes
    if (error.response) {
      console.error('API error response:', error.response.data);
    }
    // Try to update in-memory if exists (for local-only recipes)
    if (Array.isArray(window._localRecipes)) {
      const idx = window._localRecipes.findIndex(r => r.id === id);
      if (idx !== -1) {
        window._localRecipes[idx] = { ...window._localRecipes[idx], ...updatedData };
        console.warn('Simulated local update for recipe:', window._localRecipes[idx]);
        return window._localRecipes[idx];
      }
    }
    return null;
  }
};

/**
 * Add a new cuisine type locally (simulate since API doesn't exist).
 * @param {Object} cuisineData - New cuisine object.
 */
export const addCuisine = async (cuisineData) => {
  try {
    cuisinesData.push(cuisineData); // simulate update
    return cuisineData;
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
    const index = cuisinesData.findIndex(
      (c) => c.name.toLowerCase() === cuisineName.toLowerCase()
    );
    if (index !== -1) {
      cuisinesData[index] = { ...cuisinesData[index], ...updatedData };
      return cuisinesData[index];
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
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
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
    const index = cuisinesData.findIndex(
      (c) => c.name.toLowerCase() === cuisineName.toLowerCase()
    );
    if (index !== -1) {
      cuisinesData.splice(index, 1); // remove from array
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting cuisine "${cuisineName}":`, error);
    return false;
  }
};

