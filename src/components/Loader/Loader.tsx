import React from "react";

import styles from "./Loader.module.scss";

export type LoaderProps = {
  loading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading = true }) => {
  if (loading) {
    return <div className={styles.circle} />;
  } else {
    return null;
  }
};

export default React.memo(Loader);
