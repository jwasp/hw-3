import "./RecipesList.scss";
import { Link } from "react-router-dom";

import { Card } from "../Card/Card";

export type Recipe = {
  id: number;
  title: string;
  image: string;
};

export type RecipesListProps = {
  recipes: Recipe[];
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div className="RecipeList_container">
      {recipes.map((recipe: Recipe) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <Card image={recipe.image} title={recipe.title} />
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;
