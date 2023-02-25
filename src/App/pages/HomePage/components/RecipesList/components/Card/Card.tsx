import styles from "./Card.module.scss";
export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ image, title, content, onClick }): any => {
  return (
    <div className={styles.card} onClick={onClick}>
      {content}
      <img className={styles.card__img} src={image} alt="card-description" />
      <div className={styles.card__title}>{title}</div>
    </div>
  );
};

export default Card;
