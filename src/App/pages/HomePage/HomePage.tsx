import { useEffect, useState } from "react";

import axios from "axios";

import RecipesList from "./components/RecipesList";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const apiKey = "64f5d5ce908a45d784869a4ce145d792";
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`,
      });
      setRecipes(result.data.results);
    };
    fetch();
  }, []);
  return (
    <div>
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default HomePage;
