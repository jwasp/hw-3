import { useEffect, useCallback, useState } from "react";

import { RecipeItemModel } from "@store/models/recipes";
import RecipesStore from "store/RecipesStore";
import Loader from "components/Loader";
import Input from "components/Input";
import { Meta } from "utils/Meta";
import useDebounce from "utils/useDebounce";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

import RecipesList from "./components/RecipesList";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

const HomePage = () => {
  useQueryParamsStoreInit();
  const recipesStore = useLocalStore(() => new (RecipesStore as any)());
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
    },
    []
  );

  useEffect(() => {
    recipesStore.write(debouncedValueSearch);
  }, [debouncedValueSearch]);

  useEffect(() => {
    navigate(`/?search=${recipesStore.searchRecipe}`);
    setPage(1);
    setOffset(0);
    setData([]);
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
        ...recipesStore.recipes.filter(
          (el: RecipeItemModel) => !data.includes(el)
        ),
      ]);
    }
  }, [recipesStore.recipes]);
 
  return (
    <div className={styles.homePage}>
      <Input value={value} onChange={handleChangeValue} />
      <RecipesList recipes={data.length ? data : recipesStore.recipes} />
      {recipesStore.meta === Meta.loading && <Loader loading />}
    </div>
  );
};

export default observer(HomePage);
