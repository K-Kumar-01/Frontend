import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = (props) => {
	const { userInfo } = props.userDetails;

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
								<div className={`col-lg-9 col-md-8 col-sm-12 ${styles.profileInfo}`}>
									<h3 className={`text-capitalize`}>{userInfo.name}</h3>
									<h3>
										Username:
										<span className={`${styles.boldWeight}`}>{` ${userInfo.username}`}</span>
									</h3>
									<h3>
										Joined on:{` `}
										<span className={`${styles.boldWeight}`}>
											{new Date(userInfo.createdAt).toLocaleDateString()}
										</span>
									</h3>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={`${styles.otherinfo}`}>
					<div className={`container`}>
						<div className={`row`}>
							<div className={`col-md-4 col-sm-12 mb-2`}>
								<div className={`card`}>
									<div className={`card-header text-uppercase`}>
										<h4 className={`font-weight-bold heading`}>Contact Info</h4>
									</div>
									<div className={`card-body`}></div>
								</div>
							</div>
							<div className={`col-md-8 col-sm-12 mb-2`}>
								<div className={`card`}>
									<div className={`card-header text-uppercase`}>
										<h4 className={`font-weight-bold heading`}>Other details</h4>
									</div>
									<div className={`card-body`}>
										<section className={`${styles.aboutSection}`}>
											<h3 className={``}>Bio</h3>
											<p className={`text-muted lead`}>{userInfo.about}</p>
										</section>
										<hr />
										<section className={`${styles.articleSection}`}>
											<h3 className={``}>Articles</h3>
											<p className={`text-muted lead`}>Articles here</p>
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default UserProfile;
