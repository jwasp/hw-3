import React from "react";
import classnames from "classnames";

import styles from "./Filter.module.scss";
import { types } from "config/meals_types";

export type FilterProps = {
  setType: (selected: string) => void;
  selected?: string;
};

const Filter: React.FC<FilterProps> = ({selected, setType }) => {
  const handleClick = (chosenType: string) => () => {
    setType(chosenType);
  };
  return (
    <div className={styles.filter__container}>
      {types.map((type) => {
        return (
          <div
            key={type.id}
            className={classnames(styles.filter__type, type.value === selected && styles.selected)}
            onClick={handleClick(type.value)}
          >
            {type.value}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Filter);
