import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./BackArrow.module.scss";

const BackArrow: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button type="button" onClick={handleBack} className={styles.button} />
  );
};

export default React.memo(BackArrow);
