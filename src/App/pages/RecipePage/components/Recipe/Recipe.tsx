import React from "react";

import BackArrow from "components/BackArrow";
import Loader from "components/Loader";
import { IngredientItemModel } from "store/models/recipes";
import { Meta } from "utils/Meta";
import parse from 'html-react-parser';

import styles from "./Recipe.module.scss";

export type RecipeProps = {
  image: string;
  title: React.ReactNode;
  content: string;
  likes: number;
  time: number;
  ingredients: IngredientItemModel[];
  loadingStatus: string;
};
const Recipe: React.FC<RecipeProps> = ({
  image,
  title,
  content,
  likes,
  time,
  ingredients,
  loadingStatus,
}) => (
  <>
    {loadingStatus === Meta.loading ? (
      <Loader loading />
    ) : (
      <div className={styles.container}>
        <div className={styles.recipe__button}>
          <BackArrow />
        </div>
        <img src={image} alt="recipe img" className={styles.container__img} />
        <div className={styles.container__info}>
          <div className={styles.recipe__title}>{title}</div>
          <span className={styles.recipe__time}>{`${time} minutes`}</span>
          <span className={styles.recipe__likes}>{`${likes} likes`}</span>
          <div className={styles.recipe__ingredients}>
            <ul>
              {ingredients?.map((ingredient: IngredientItemModel) => {
                return (
                  <li key={`${ingredient.name}-${ingredient.id}`}>
                    {ingredient.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className={styles.recipe__content}>{parse(content)}</p>
        </div>
      </div>
    )}
  </>
);

export default React.memo(Recipe);
