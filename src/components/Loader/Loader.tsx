import React from "react";

import styles from "./Loader.module.scss";

export type LoaderProps = {
  loading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading = true }): any => {
  return loading && <div className={styles.circle}></div>;
};

export default Loader;
