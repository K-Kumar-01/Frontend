import styles from "./Skeleton.module.css";

function SkeletonElement({ type }) {
  const classes = `${styles.skeleton} ${styles[type]}`;

  return <div className={classes}></div>;
}

export default SkeletonElement;
