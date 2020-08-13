import React from 'react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="container">
			<div className="d-flex justify-content-between">
				<div>
					<p>Logo here</p>
					<div className="d-flex justify-content-between">
						<div>
							<Link href="/signup">
								<a>Get Started</a>
							</Link>
						</div>
						<div>
							<Link href="/membership">
								<a>Subscribe </a>
							</Link>
						</div>
						<div>
							<span> Having account?</span>
							<Link href="/signin">
								<a>Signin</a>
							</Link>
						</div>
					</div>
					<p>© 2020 Titan Read</p>
				</div>
				<div>
					<p>Contact Us</p>
					<p>
						<a href="mailto:">Mail</a>
					</p>
                    <p>
                        Phone Numbers here
                    </p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
