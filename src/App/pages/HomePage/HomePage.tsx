import { useEffect, useCallback, useState } from "react";

import Loader from "@components/Loader";
import { RecipeItemModel } from "@store/models/recipes";
import RecipesStore from "@store/RecipesStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/Meta";
import useDebounce from "@utils/useDebounce";
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
  let searchValue = initSearch.search.split("=")[1] ?? "";
  const [value, setValue] = useState(searchValue);
  const [data, setData] = useState<RecipeItemModel[]>([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const debouncedValueSearch = useDebounce<string | number>(value, 1000);
  const debouncedValueScroll = useDebounce<string | number>(page, 1000);

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setPage(1);
      setOffset(0);
      setData([]);
    },
    []
  );

  useEffect(() => {
    recipesStore.write(value);
  }, [debouncedValueSearch]);

  useEffect(() => {
    navigate(`/?search=${recipesStore.searchRecipe}`);
    setPage(1);
    setOffset(0);
  }, [recipesStore.searchRecipe]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
      setOffset((prev) => prev + 8);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (recipesStore.meta !== Meta.loading) {
      recipesStore.getRecipes(searchValue, page, offset);
    }
  }, [debouncedValueScroll]);

  useEffect(() => {
    if (recipesStore.meta !== Meta.loading) {
      setData([
        ...data,
        ...recipesStore.recipes.filter((el) => !data.includes(el)),
      ]);
    }
  }, [page]);

  return (
    <>
      <Input
        value={value}
        onChange={handleChangeValue}
        style={{ width: 560, margin: 10, height: 40 }}
      />
      <RecipesList recipes={data.length ? data : recipesStore.recipes} />
      {recipesStore.meta === Meta.loading && <Loader loading />}
    </>
  );
};

export default observer(HomePage);
