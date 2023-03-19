import React from "react";
import classnames from "classnames";

import styles from "./Filter.module.scss";

const types = [
  { id: 0, value: "main course" },
  { id: 1, value: "side dish" },
  { id: 2, value: "dessert" },
  { id: 3, value: "appetizer" },
  { id: 4, value: "salad" },
  { id: 5, value: "bread" },
  { id: 6, value: "breakfast" },
  { id: 7, value: "soup" },
  { id: 8, value: "beverage" },
  { id: 9, value: "sauce" },
  { id: 10, value: "marinade" },
  { id: 11, value: "fingerfood" },
  { id: 12, value: "snack" },
  { id: 13, value: "drink" },
  { id: 14, value: "all" },
];

export type FilterProps = {
  setType: (selected: string) => void;
  selected?: string;
};

const Filter: React.FC<FilterProps> = ({selected, setType }): any => {
  const handleClick = (chosenType: string) => {
    setType(chosenType);
  };
  return (
    <div className={styles.filter__container}>
      {types.map((type) => {
        return (
          <div
            key={type.id}
            className={classnames(styles.filter__type, type.value === selected && styles.selected)}
            onClick={() => handleClick(type.value)}
          >
            {type.value}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Filter);
