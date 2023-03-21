import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./BackArrow.module.scss";

export type BackArrowProps = {
  pathName?: string;
};

const BackArrow: React.FC<BackArrowProps> = ({ pathName }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (pathName) navigate(pathName);
    else {
      navigate(-1);
    }
  };
  return (
    <button type="button" onClick={handleBack} className={styles.button} />
  );
};

export default React.memo(BackArrow);
