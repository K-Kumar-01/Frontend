import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

import styles from "./Skeleton.module.css";

const SkeletonArticle = ({ main }) => {
  return (
    <div className={`${styles.skeletonWrapper} ${styles.light}`}>
      <div
        className={
          styles[`${main ? "skeleton-article-main" : "skeleton-article"}`]
        }
      >
        <div>
          <SkeletonElement type={main ? "thumbnail" : "thumbnailside"} />
        </div>
        <div>
          <SkeletonElement type="title" />
          {main &&
            [1, 2, 3, 4, 5].map((i) => <SkeletonElement key={i} type="text" />)}
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;
