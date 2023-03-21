import React from "react";
import classnames from "classnames";

import styles from "./Card.module.scss";
import { arrRange } from "utils/rangeArr";

export type CardProps = {
  image?: string;
  loading?: Boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ image, title, onClick, loading }) => {
  const loadElementsArray = arrRange(4);
  return (
    <div
      className={classnames(styles.card, loading && styles.loading)}
      onClick={onClick}
    >
      {loading ? (
        loadElementsArray.map((el) => (
          <div key={el} className={styles.loading__element}></div>
        ))
      ) : (
        <>
          <img
            className={styles.card__img}
            src={image}
            alt="card-description"
          />
          <div className={styles.card__title}>{title}</div>
        </>
      )}
    </div>
  );
};

export default React.memo(Card);
