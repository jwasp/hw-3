import {
  IngredientItemApi,
  IngredientItemModel,
  normalizeIngredientItem,
} from "./ingredientItem";

export type RecipeCardApi = {
  image: string;
  title: string;
  instructions: string;
  aggregateLikes: number;
  readyInMinutes: number;
  extendedIngredients: IngredientItemApi[];
  cheap: boolean;
  glutenFree: boolean;
  healthScore: number;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  gaps: string;
  dairyFree: boolean;
  sourceName: string;
  sourceUrl: string;
};

export type RecipeCardModel = {
  image: string;
  title: string;
  description: string;
  likes: number;
  cookingTime: number;
  ingredients: IngredientItemModel[];
};

export const normalizeRecipeCard = (from: RecipeCardApi): RecipeCardModel => ({
  image: from.image,
  title: from.title,
  description: from.instructions,
  likes: from.aggregateLikes,
  cookingTime: from.readyInMinutes,
  ingredients: from.extendedIngredients.map((ingredient) =>
    normalizeIngredientItem(ingredient)
  ),
});
