import React from "react";

import { RecipeItemModel } from "@store/models/recipes";
import { Button } from "antd";
import { Link } from "react-router-dom";

import Card from "./components/Card";
import styles from "./RecipesList.module.scss";

export type RecipesListProps = {
  recipes: RecipeItemModel[];
  handleClick: () => void;
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes, handleClick }) => {
  return (
    <div className={styles.RecipeList_container}>
      {recipes.map((recipe: RecipeItemModel) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <Card image={recipe.image} title={recipe.title} />
        </Link>
      ))}
      {recipes.length !== 0 && <Button onClick={handleClick}>show more</Button>}
    </div>
  );
};

export default React.memo(RecipesList);
