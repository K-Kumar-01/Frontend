import React from 'react';
import styles from './Preloader.module.css';

const Preloader = () => {
	return (
		<div>
			<div className={`${styles.loader}`}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<span style={{ display: 'none' }}>Loading ..</span>
		</div>
	);
};

export default Preloader;
