import { useEffect } from "react";

import OneRecipeStore from "store/OneRecipeStore";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Recipe from "./components/Recipe";

const RecipePage = () => {
  const recipeStore = useLocalStore(() => new OneRecipeStore());
  const { id } = useParams();
  //добавить переформатирование текста

  useEffect(() => {
    recipeStore.getRecipe(id);
  }, [id]);
  if (recipeStore.recipe) {
    return (
      <Recipe
        image={recipeStore.recipe.image}
        title={recipeStore.recipe.title}
        content={recipeStore.recipe.description}
        likes={recipeStore.recipe.likes}
        time={recipeStore.recipe.cookingTime}
        ingredients={recipeStore.recipe.ingredients}
        loadingStatus={recipeStore.meta}
      />
    );
  }
  return null;
};

export default observer(RecipePage);
