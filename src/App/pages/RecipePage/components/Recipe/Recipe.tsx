import BackArrow from "components/BackArrow";
import { Ingredients } from "pages/RecipePage/RecipePage";

import styles from "./Recipe.module.scss";

export type RecipeProps = {
  image: string;
  title: React.ReactNode;
  content?: React.ReactNode;
  likes: number;
  time: number;
  ingredients: Ingredients[];
};
const Recipe: React.FC<RecipeProps> = ({
  image,
  title,
  content,
  likes,
  time,
  ingredients,
}) => (
  <div className={styles.container}>
    <div className={styles.recipe__button}>
      <BackArrow pathName="/" />
    </div>
    <img src={image} alt="recipeImg" className={styles.container__img} />
    <div className={styles.container__info}>
      <div className={styles.recipe__title}>{title}</div>
      <span className={styles.recipe__time}>{`${time} minutes`}</span>
      <span className={styles.recipe__likes}>{`${likes} likes`}</span>
      <div className={styles.recipe__ingredients}>
        <ul>
          {ingredients?.map((ingredient: Ingredients) => {
            return (
              <li key={`${ingredient.name}-${ingredient.id}`}>
                {ingredient.name}
              </li>
            );
          })}
        </ul>
      </div>
      <p className={styles.recipe__content}>{content}</p>
    </div>
  </div>
);

export default Recipe;
