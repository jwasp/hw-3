import { apiKey } from "config/api_key";
import { normalizeRecipeItem, RecipeItemModel } from "store/models/recipes";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import rootStore from "store/RootStore";
import { Meta } from "utils/Meta";
import { ILocalStore } from "utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  reaction,
  runInAction,
  IReactionDisposer,
} from "mobx";

type PrivateFields = "_recipes" | "_meta" | "_searchRecipe";
export default class RecipesStore implements ILocalStore {
  private _recipes: CollectionModel<number, RecipeItemModel> =
    getInitialCollectionModel();
  private _meta = Meta.initial;
  private _searchRecipe = "";

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipes: observable.ref,
      _meta: observable,
      _searchRecipe: observable,
      recipes: computed,
      searchRecipe: computed,
      meta: computed,
      getRecipes: action,
      write: action,
    });
  }

  get recipes(): RecipeItemModel[] {
    return linearizeCollection(this._recipes);
  }

  get meta(): Meta {
    return this._meta;
  }

  get searchRecipe(): string {
    return this._searchRecipe;
  }

  write = (str: string): void => {
    this._searchRecipe = str;
  };

  async getRecipes(
    search: string | string[] | any | undefined,
    page: number,
    offset: number
  ): Promise<void> {
    this._meta = Meta.loading;
    this._recipes = getInitialCollectionModel();
    try {
      const response = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?query=${search}&page=${page}&number=8&offset=${offset}&apiKey=${apiKey}`,
      });

      runInAction(() => {
        if (response.status !== 200) {
          this._meta = Meta.error;
          return;
        }

        const recipes: RecipeItemModel[] = [];

        for (const item of response.data.results) {
          recipes.push(normalizeRecipeItem(item));
        }

        this._meta = Meta.success;
        this._recipes = normalizeCollection(
          recipes,
          (recipeItem) => recipeItem.id
        );
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e);
      this._meta = Meta.error;
      this._recipes = getInitialCollectionModel();
    }
  }

  destroy(): void {
    //this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    async (search) => {
      await this.getRecipes(search, 1, 0);
    }
  );
}
