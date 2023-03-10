import { useEffect, useState } from "react";

import { apiKey } from "config/api_key";
import axios from "axios";

import RecipesList from "./components/RecipesList";

export type Recipe = {
  id: number;
  title: string;
  image: string;
};

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`,
      });
      setRecipes(result.data.results);
    };
    fetch();
  }, []);
  return <RecipesList recipes={recipes} />;
};

export default HomePage;
