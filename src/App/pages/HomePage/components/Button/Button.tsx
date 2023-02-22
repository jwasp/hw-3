import classnames from 'classnames';
import './Button.scss';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  ...props
}): any => {
  return (
    <button
      className={classnames(
        'button',
        disabled && 'button_disabled',
      )}
      {...props}
    >
      {<div>{children}</div>}
    </button>
  );
};
