import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './Header.module.css';
import { authenticate, removeCookie } from '../helpers/auth';
import { COOKIE_NAME } from '../appConstants';
import { logoutUser } from '../actions/auth';
import { useRouter } from 'next/router';

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		setLoggedIn(authenticate(COOKIE_NAME));
	}, []);
	const router = useRouter();

	const logout = async () => {
		let response;
		try {
			response = await logoutUser();
			if (response.error) {
				console.log(error);
			} else {
				removeCookie(COOKIE_NAME);
				router.push('/signin');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-top navbar-light bg-light sticky-top">
			<div className="container">
				<Link href="/">
					<a className="navbar-brand">Titan Read</a>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto d-flex align-items-center">
						<li className="nav-item">
							<Link href="/membership">
								<button className={`${styles.link} btn`}>Subscribe</button>
							</Link>
						</li>

						{loggedIn ? (
							<li className="nav-item dropdown">
								<span
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<img src={loggedIn.avatar} className={`${styles.avatar}`} />
								</span>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link href={`/user/edit/${loggedIn.username}`}>
										<a className="dropdown-item">Profile</a>
									</Link>
									<a className="dropdown-item" href="#">
										My Posts
									</a>
									<div className="dropdown-divider"></div>

									<button className="dropdown-item" onClick={logout}>
										Logout
									</button>
								</div>
							</li>
						) : (
							<li className="nav-item">
								<Link href="/signup">
									<button className={`btn btn-outline-success`}>Get Started</button>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
