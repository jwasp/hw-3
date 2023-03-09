import { Recipe } from "pages/HomePage/HomePage";
import { Link } from "react-router-dom";

import Card from "./components/Card";
import styles from "./RecipesList.module.scss";

export type RecipesListProps = {
  recipes: Recipe[];
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div className={styles.RecipeList_container}>
      {recipes.map((recipe: Recipe) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <Card image={recipe.image} title={recipe.title} />
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;
