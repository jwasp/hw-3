import { apiKey } from "@config/api_key";
import { IngredientItemModel, RecipeCardModel } from "@store/models/recipes";
import { Meta } from "@utils/Meta";
import { ILOcalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

type PrivateFields = "_recipe" | "_meta";
export default class OneRecipeStore implements ILOcalStore {
  private _recipe: RecipeCardModel | undefined;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<OneRecipeStore, PrivateFields>(this, {
      _recipe: observable.ref,
      _meta: observable,
      recipe: computed,
      meta: computed,
      getRecipe: action,
    });
  }

  get recipe(): RecipeCardModel | undefined {
    return this._recipe;
  }
  get meta(): Meta {
    return this._meta;
  }

  async getRecipe(id: string | undefined): Promise<void> {
    this._meta = Meta.loading;
    this._recipe = {
      image: "",
      title: "",
      description: "",
      likes: 0,
      cookingTime: 0,
      ingredients: [],
    };
    const response: any = await axios({
      method: "get",
      url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
    });

    runInAction(() => {
      if (!response.status) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;

        this._recipe = {
          image: response.data.image,
          title: response.data.title,
          description: response.data.instructions,
          likes: response.data.aggregateLikes,
          cookingTime: response.data.readyInMinutes,
          ingredients: response.data.extendedIngredients.map(
            (item: IngredientItemModel) => {
              return { name: item.name, id: item.id };
            }
          ),
        };
        return;
      } catch (e) {
        /* eslint-disable no-console */
        console.log(e);
        this._meta = Meta.error;
        this._recipe = {
          image: "",
          title: "",
          description: "",
          likes: 0,
          cookingTime: 0,
          ingredients: [],
        };
      }
    });
  }
  destroy(): void {}
}
