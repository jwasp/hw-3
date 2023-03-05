export type RecipeItemApi = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export type RecipeItemModel = {
  id: number;
  title: string;
  image: string;
};

export const normalizeRecipeItem = (from: RecipeItemApi): RecipeItemModel => ({
  id: from.id,
  title: from.title,
  image: from.image,
});
