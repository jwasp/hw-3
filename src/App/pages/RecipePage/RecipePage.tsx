import { useEffect } from "react";

import OneRecipeStore from "store/OneRecipeStore";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Recipe from "./components/Recipe";
import { Meta } from "utils/Meta";
import Loader from "components/Loader";
import styles from "./RecipePage.module.scss";

const RecipePage = () => {
  const recipeStore = useLocalStore(() => new OneRecipeStore());
  const { id } = useParams();

  useEffect(() => {
    recipeStore.getRecipe(id);
  }, [id]);

  return (
    <div className={styles.recipePage}>
      {recipeStore.meta === Meta.loading && (
        <div className={styles.loader__container}>
          <Loader loading />
        </div>
      )}
      {recipeStore.recipe && (
        <Recipe
          image={recipeStore.recipe.image}
          title={recipeStore.recipe.title}
          content={recipeStore.recipe.description}
          likes={recipeStore.recipe.likes}
          time={recipeStore.recipe.cookingTime}
          ingredients={recipeStore.recipe.ingredients}
          loadingStatus={recipeStore.meta}
        />
      )}
    </div>
  );
};

export default observer(RecipePage);
