import "./Card.scss";
export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}): any => {
  return (
    <div className="card" onClick={onClick}>
      {content}
      <img className="card__img" src={image} alt="" />
      <div className="card__title">{title}</div>
    </div>
  );
};
