import "./Recipe.scss";

import { Ingredients } from "@pages/RecipePage/RecipePage";

import BackArrow from "../../../../../components/BackArrow";

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
}) => {
  return (
    <>
      <div className="recipe-container">
        <div className="recipe__back-button">
          <BackArrow pathName={"/"} />
        </div>
        <img src={image} alt="recipeImg" className="recipe-container__img" />
        <div className="recipe-container__info">
          <div className="recipe__title">{title}</div>
          <span className="recipe__time">{`${time} minutes`}</span>
          <span className="recipe__likes">{`${likes} likes`}</span>
          <div className="reciper__ingredients">
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
          <p className="recipe__content">{content}</p>
        </div>
      </div>
    </>
  );
};

export default Recipe;
