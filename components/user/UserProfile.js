import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
	return (
		<div className={`container-fluid`}>
			<main className={`${styles.maincontainer}`}>
				<section className={`${styles.basicinfo}`}>
					<div className={`w-100 ${styles.profile}`}>
						<div className={`${styles.backgroundCover} col-12`}></div>
						<div className={`container`}>
							<div className={`row `}>
								<div className={`col-lg-3 col-md-4 col-sm-12 text-center`}>
									<img
										src="https://res.cloudinary.com/dr6pkartq/image/upload/v1600010974/n1f6wgh2sursue6tezo1.jpg"
										className={`${styles.profileImage}`}
									/>
								</div>
								<div className={`col-lg-9 col-md-8 col-sm-12 ${styles.profileInfo}`}>Choose your</div>
							</div>
						</div>
					</div>
				</section>
				<section className={`${styles.otherinfo}`}>
					<div className={`container`}>
						<div className={`row`}>
							<div className={`col-md-4 col-sm-12`}>yooy</div>
							<div className={`col-md-8 col-sm-12`}>hello</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default UserProfile;
