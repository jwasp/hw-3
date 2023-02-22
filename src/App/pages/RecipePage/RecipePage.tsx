import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import Recipe from "./components/Recipe";

export type Ingredients = {
  name: string;
  id: number;
};

const RecipePage = () => {
  const [recipe, setRecipe] = useState<any>({});
  const { id } = useParams();
  const apiKey = "64f5d5ce908a45d784869a4ce145d792";

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      });
      setRecipe({
        image: result.data.image,
        title: result.data.title,
        description: result.data.instructions,
        likes: result.data.aggregateLikes,
        cookingTime: result.data.readyInMinutes,
        ingredients: result.data.extendedIngredients.map(
          (item: Ingredients) => {
            return { name: item.name, id: item.id };
          }
        ),
      });
    };
    fetch();
  }, [id]);
  return (
    <div>
      <Recipe
        image={recipe.image}
        title={recipe.title}
        content={recipe.description}
        likes={recipe.likes}
        time={recipe.cookingTime}
        ingredients={recipe.ingredients}
      />
    </div>
  );
};

export default RecipePage;
