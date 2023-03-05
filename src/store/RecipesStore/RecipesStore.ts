import { apiKey } from "@config/api_key";
import { normalizeRecipeItem, RecipeItemModel } from "@store/models/recipes";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/Meta";
import { ILOcalStore } from "@utils/useLocalStore";
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

type PrivateFields = "_recipes" | "_meta" | "_searchRecipe" | "_shownAmount";
export default class RecipesStore implements ILOcalStore {
  private _recipes: CollectionModel<number, RecipeItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _shownAmount: number = 4;
  private _searchRecipe: string = "";

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipes: observable.ref,
      _shownAmount: observable,
      _meta: observable,
      _searchRecipe: observable,
      recipes: computed,
      shownAmount: computed,
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
  get shownAmount(): number {
    return this._shownAmount;
  }

  write = (str: any): void => {
    this._searchRecipe = str;
  };

  increaseAmount = (num: number): void => {
    this._shownAmount += num;
  };

  async getRecipes(search: string | string[] | any | undefined): Promise<void> {
    this._meta = Meta.loading;
    this._recipes = getInitialCollectionModel();
    const response = await axios({
      method: "get",
      url: `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=${this._shownAmount}&apiKey=${apiKey}`,
    });

    runInAction(() => {
      if (!response.status) {
        this._meta = Meta.error;
      }

      try {
        const recipes: RecipeItemModel[] = [];

        for (const item of response.data.results) {
          recipes.push(normalizeRecipeItem(item));
        }

        this._meta = Meta.success;
        this._recipes = normalizeCollection(
          recipes,
          (recipeItem) => recipeItem.id
        );
        return;
      } catch (e) {
        /* eslint-disable no-console */
        console.log(e);
        this._meta = Meta.error;
        this._recipes = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    //this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    async (search) => {
      await this.getRecipes(search);
    }
  );
}
