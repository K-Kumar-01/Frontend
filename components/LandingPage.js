import React from 'react';
import Link from 'next/link';
import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={`${styles.mainback}`}>
			<div className={`${styles.lp}`}>
				<div className={`container ${styles.mainstyles}`}>
					<h1 className={`heading`}>Understand about the topics</h1>
					<h3 className={`heading`}>Dive into them</h3>
					<h1 className={`heading`}>Learn with the world</h1>
					<br />
					<br />
					<Link href="/signup">
						<a>
							<button className={`btn btn-outline-light mb-1 ${styles.button}`}>Get Started</button>
						</a>
					</Link>
					<br />
					<p>
						Already have an account?
						<Link href="/signin">
							<a>
								<button
									className={`btn mb-1 font-bold heading text-capitalize ${styles.link}`}
									style={{ fontSize: '1.2rem' }}
								>
									Sign in
								</button>
							</a>
						</Link>
					</p>
					<div>
						Just here to read.
						<Link href="/articles">
							<a>
								<button
									className={`btn mb-1 font-bold heading text-capitalize ${styles.link}`}
									style={{ fontSize: '1.2rem' }}
								>
									Articles
								</button>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className={`container pt-3`}>
				<div className={`row`}>
					<div className={`col-lg-7 col-md-9 col-sm-12 text-justify`}>
						<h2 className={`heading ${styles.green}`}>Why Us</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum sapien tortor,
							sit amet eleifend lorem sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt
							eu massa. Nam id lorem fringilla, semper elit in, convallis metus. Fusce dignissim pharetra
							urna, non tempor leo. Proin sagittis eget mi id tincidunt. Vivamus maximus lacus ac sapien
							aliquet, accumsan bibendum diam mollis. Praesent aliquet eros tincidunt, viverra metus ac,
							consequat erat. Praesent vel tempus libero. Curabitur in rhoncus dui. In hac habitasse
							platea dictumst. Sed nisi erat, posuere non mi nec, ultrices imperdiet neque. Nulla
							pellentesque accumsan condimentum. Nullam sed mattis sem. Phasellus pharetra, urna vel
							faucibus tempus, sapien ipsum elementum risus, vel volutpat est felis ornare nisi. Fusce
							vulputate dolor eget semper viverra. Maecenas finibus bibendum nibh.
						</p>
					</div>
				</div>
			</div>
			<div className={`container pt-3`}>
				<div className={`row`}>
					<div className={`col-lg-7 offset-lg-5 col-md-9 offset-md-3 col-sm-12 offset-sm-0 text-justify`}>
						<p>
							<h2 className={`heading ${styles.green}`}>What Our Members has to say</h2>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum sapien tortor,
							sit amet eleifend lorem sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt
							eu massa. Nam id lorem fringilla, semper elit in, convallis metus. Fusce dignissim pharetra
							urna, non tempor leo. Proin sagittis eget mi id tincidunt. Vivamus maximus lacus ac sapien
							aliquet, accumsan bibendum diam mollis. Praesent aliquet eros tincidunt, viverra metus ac,
							consequat erat. Praesent vel tempus libero. Curabitur in rhoncus dui. In hac habitasse
							platea dictumst. Sed nisi erat, posuere non mi nec, ultrices imperdiet neque. Nulla
							pellentesque accumsan condimentum. Nullam sed mattis sem. Phasellus pharetra, urna vel
							faucibus tempus, sapien ipsum elementum risus, vel volutpat est felis ornare nisi. Fusce
							vulputate dolor eget semper viverra. Maecenas finibus bibendum nibh.
						</p>
					</div>
				</div>
			</div>
			<div className={`container`}>
				<div className={`text-center`}>
					<h1 className={`heading ${styles.green}`}>Subscribe to get the most of us</h1>
					<p>Read unlimited articles. Write unlimited. Do unlimited. Be unlimited</p>
					<Link href="/membership">
						<a>
							<button className={`btn btn-outline-success`}>Subscribe</button>
						</a>
					</Link>
				</div>
			</div>
			<div className={`container text-center py-5`}>
				<h1 className={`text-capitalize heading ${styles.green}`}>So what are you waiting for?</h1>
				<h3 className={``}>Learn More with us</h3>
				<Link href="/signup">
					<a>
						<button className={`btn btn-success mb-1`}>Get Started</button>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
