export type IngredientItemApi = {
  name: string;
  id: number;
};

export type IngredientItemModel = {
  name: string;
  id: number;
};

export const normalizeIngredientItem = (
  from: IngredientItemApi
): IngredientItemModel => ({
  name: from.name,
  id: from.id,
});
