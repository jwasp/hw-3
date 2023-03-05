import { useEffect, useState } from "react";

import { apiKey } from "@config/api_key";
import axios from "axios";
import { useParams } from "react-router-dom";

import Recipe from "./components/Recipe";

export type Ingredients = {
  name: string;
  id: number;
};

export type RecipeType = {
  image: string;
  title: string;
  description: string;
  likes: number;
  cookingTime: number;
  ingredients: Ingredients[];
};

const RecipePage = () => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const { id } = useParams();

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
    <>
      {recipe && (
        <Recipe
          image={recipe.image}
          title={recipe.title}
          content={recipe.description}
          likes={recipe.likes}
          time={recipe.cookingTime}
          ingredients={recipe.ingredients}
        />
      )}
    </>
  );
};

export default RecipePage;
