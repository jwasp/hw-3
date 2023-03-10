import { apiKey } from "@config/api_key";
import {
  normalizeRecipeCard,
  RecipeCardApi,
  RecipeCardModel,
} from "@store/models/recipes";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

type PrivateFields = "_recipe" | "_meta";
export default class OneRecipeStore implements ILocalStore {
  private _recipe: RecipeCardModel | null = null;
  private _meta = Meta.initial;

  constructor() {
    makeObservable<OneRecipeStore, PrivateFields>(this, {
      _recipe: observable.ref,
      _meta: observable,
      recipe: computed,
      meta: computed,
      getRecipe: action,
    });
  }

  get recipe(): RecipeCardModel | null {
    return this._recipe;
  }
  get meta(): Meta {
    return this._meta;
  }

  async getRecipe(id: string | undefined): Promise<void> {
    this._meta = Meta.loading;
    this._recipe = null;
    try {
      const response = await axios<RecipeCardApi>({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      });

      runInAction(() => {
        if (response.status !== 200) {
          this._meta = Meta.error;
          return;
        }

        this._meta = Meta.success;
        this._recipe = normalizeRecipeCard(response.data);
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e);
      this._meta = Meta.error;
      this._recipe = null;
    }
  }
  destroy(): void {}
}
