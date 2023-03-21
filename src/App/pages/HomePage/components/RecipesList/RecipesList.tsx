import React from "react";

import { RecipeItemModel } from "@store/models/recipes";
import { Link, useLocation } from "react-router-dom";

import Card from "./components/Card";
import styles from "./RecipesList.module.scss";
import { arrRange } from "utils/rangeArr";

export type RecipesListProps = {
  recipes: RecipeItemModel[];
  loading: Boolean;
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes, loading = true }) => {
  const loadingArr = arrRange(6);
  return (
    <div className={styles.RecipeList_container}>

      {!recipes.length && loadingArr.map((el) => <Card key={el} loading={loading}/>)}
      {recipes.map((recipe: RecipeItemModel) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <Card image={recipe.image} title={recipe.title}/>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(RecipesList);
