import { useEffect, useCallback, useState, useRef } from "react";

import { RecipeItemModel } from "@store/models/recipes";
import rootStore from "store/RootStore";
import RecipesStore from "store/RecipesStore";
import Loader from "components/Loader";
import Input from "components/Input";
import { Meta } from "utils/Meta";
import useDebounce from "utils/useDebounce";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

import RecipesList from "./components/RecipesList";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import qs from "qs";
import Filter from "./components/Filter";

const HomePage = () => {
  useQueryParamsStoreInit();
  const recipesStore = useLocalStore(() => new (RecipesStore as any)());
  let searchValue = rootStore.query.getParam("search");
  let pageValue = Number(rootStore.query.getParam("page"));
  let offsetValue = Number(rootStore.query.getParam("offset"));
  let typeValue = rootStore.query.getParam("type");
  let queryString;

  const navigate = useNavigate();
  const [value, setValue] = useState<any>(searchValue ? searchValue : "");
  const [data, setData] = useState<RecipeItemModel[]>([]);
  const [page, setPage] = useState(pageValue ? pageValue : 1);
  const [type, setType] = useState<any>(typeValue);
  const [offset, setOffset] = useState(offsetValue ? offsetValue : 0);
  const [downloadData, setDownloadData] = useState(true);
  const debouncedValueSearch = useDebounce<String>(value, 1000);
  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  useEffect(() => {
    setData([]);
    queryString = qs.stringify({
      search: debouncedValueSearch,
      page: 1,
      offset: 0,
      type: type,
    });
    if (debouncedValueSearch !== searchValue || type !== typeValue) {
      setPage(1);
      setOffset(0);
    }
    navigate(`/?${queryString}`);
  }, [debouncedValueSearch, type]);

  useEffect(() => {
    queryString = qs.stringify({
      search: value,
      page: page,
      offset: offset,
      type: type,
    });
    navigate(`/?${queryString}`);
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setDownloadData(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const number = pageValue * 8;

    if (recipesStore.meta !== Meta.loading) {
      recipesStore.getRecipes(searchValue ?? "", 1, 0, type, number);
      setDownloadData(false);
    }
  }, []);

  useEffect(() => {
    if (
      recipesStore.meta !== Meta.loading &&
      downloadData &&
      recipesStore.recipes.length !== 0 && data.length < recipesStore.totalItems
    ) {
      setPage((prev) => prev + 1);
      setOffset((prev) => prev + 8);
    }
  }, [downloadData]);

  useEffect(() => {
    if (recipesStore.meta !== Meta.loading && page !== 1) {
      recipesStore.getRecipes(searchValue, page, offset, type);
    }
    setDownloadData(false);
  }, [page]);

  useEffect(() => {
    if (
      recipesStore.meta !== Meta.loading &&
      data[0]?.id !== recipesStore.recipes[0]?.id
    ) {
      setData([...data, ...recipesStore.recipes]);
      setDownloadData(false);
    }
  }, [recipesStore.recipes]);

  return (
    <div className={styles.homePage}>
      <Input value={value ? value : ""} onChange={handleChangeValue} />
      <Filter setType={setType} selected={type} />
      {!recipesStore.recipes.length && recipesStore.meta !== Meta.loading ? (
        <div className={styles.error__message}>
          Whoops! nothing was found... or I need some rest
        </div>
      ) : (
        <RecipesList
          recipes={data.length ? data : recipesStore.recipes}
          loading={recipesStore.meta === Meta.loading}
        />
      )}
      {recipesStore.meta === Meta.loading && <Loader loading />}
    </div>
  );
};

export default observer(HomePage);
