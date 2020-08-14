import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={`${styles.footer}`}>
			<div className="container">
				<div className="d-flex justify-content-between">
					<div>
						<p>Logo here</p>
						<div className="d-flex justify-content-between">
							<div>
								<Link href="/signup">
									<a className={`${styles.link}`}>Get Started</a>
								</Link>
							</div>
							<div>
								<Link href="/membership">
									<a className={`${styles.link}`}>Subscribe </a>
								</Link>
							</div>
							<div>
								<Link href="/signin">
									<a className={`${styles.link}`}>Signin</a>
								</Link>
							</div>
						</div>
						<p>© 2020 Titan Read</p>
					</div>
					<div>
						<p>Contact Us</p>
						<p>
							<a className={`${styles.link}`} href="mailto:">
								Mail
							</a>
						</p>
						<p>Phone Numbers here</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
