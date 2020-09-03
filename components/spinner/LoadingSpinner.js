import React from 'react';

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
	return (
		<div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
			<div className={`${styles.ldsDR}`}></div>
		</div>
	);
};

export default LoadingSpinner;
