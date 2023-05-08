import React from "react";

import classnames from "classnames";
import SearchIcon from "./../../../public/static/images/search.svg";
import styles from "./Input.module.scss";
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
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
    <div className={styles.input_container}>
      <input
        type="text"
        value={value}
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        disabled={disabled}
        className={classnames(styles.input, disabled && styles.disabled)}
      />
      {/* <img src={SearchIcon} alt="search img" className={styles.input_img} /> */}
    </div>
  );
};

export default React.memo(Input);
