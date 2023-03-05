import { useEffect, useCallback } from "react";

import Loader from "@components/Loader";
import RecipesStore from "@store/RecipesStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/useLocalStore";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import RecipesList from "./components/RecipesList";

const HomePage: React.FC = () => {
  useQueryParamsStoreInit();
  const recipesStore = useLocalStore(() => new RecipesStore());
  const navigate = useNavigate();
  const initSearch = useLocation();

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      recipesStore.write(e.target.value),
    [recipesStore]
  );
  let searchValue = initSearch.search.split("=")[1] ?? "";
  useEffect(() => {
    navigate(`/?search=${recipesStore.searchRecipe}`);
  }, [recipesStore.searchRecipe]);

  useEffect(() => {
    navigate(`/?search=${searchValue}`);
    recipesStore.getRecipes(searchValue);
  }, [recipesStore.shownAmount]);

  const handleClick = () => {
    recipesStore.increaseAmount(4);
  };

  return (
    <>
      <Input
        value={searchValue}
        onChange={handleChangeValue}
        style={{ width: 560, margin: 10, height: 40 }}
      />
      {recipesStore.meta === Meta.loading && <Loader loading />}
      <RecipesList recipes={recipesStore.recipes} handleClick={handleClick} />
    </>
  );
};

export default observer(HomePage);
