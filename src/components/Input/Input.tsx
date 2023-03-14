import React from 'react';

import classnames from 'classnames';
import './Input.scss';
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  return (
    <>
      <input
        type="text"
        value={value}
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        disabled={disabled}
        className={classnames('input', className, disabled && 'input_disabled')}
      />
    </>
  );
};

export default React.memo(Input);