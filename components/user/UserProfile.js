import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
	return (
		<div className={`container-fluid `}>
			<div className={`w-100 ${styles.profile}`}>
				<div className={`${styles.backgroundCover} col-12`}></div>
				<div className={`container`}>
					<div className={`row`}>
						<div className={`col-lg-3 col-md-4 col-sm-6 text-center`}>
							<img
								src="https://res.cloudinary.com/dr6pkartq/image/upload/v1600010974/n1f6wgh2sursue6tezo1.jpg"
								className={`${styles.profileImage}`}
							/>
						</div>
						<div className={`col-lg-9 col-md-8 col-sm-6 ${styles.profileInfo}`}>Choose your</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
