import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={`${styles.mainback}`}>
			<div className={`${styles.lp}`}>
				<div className={`container ${styles.mainstyles}`}>
					<p>Understand about the topics</p>
					<p>Dive into them</p>
					<p>Learn with the world</p>
					<br />
					<br />
					<button className={`btn btn-outline-light mb-1`}>Get Started</button>
					<p>
						Already have an account.<span>Sign in</span>
					</p>
				</div>
			</div>
			<div className={`container`}>
				<h2>Why Us</h2>
				<p style={{ maxWidth: '60%' }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum sapien tortor, sit
					amet eleifend lorem sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt eu massa. Nam
					id lorem fringilla, semper elit in, convallis metus. Fusce dignissim pharetra urna, non tempor leo.
					Proin sagittis eget mi id tincidunt. Vivamus maximus lacus ac sapien aliquet, accumsan bibendum diam
					mollis. Praesent aliquet eros tincidunt, viverra metus ac, consequat erat. Praesent vel tempus
					libero. Curabitur in rhoncus dui. In hac habitasse platea dictumst. Sed nisi erat, posuere non mi
					nec, ultrices imperdiet neque. Nulla pellentesque accumsan condimentum. Nullam sed mattis sem.
					Phasellus pharetra, urna vel faucibus tempus, sapien ipsum elementum risus, vel volutpat est felis
					ornare nisi. Fusce vulputate dolor eget semper viverra. Maecenas finibus bibendum nibh.
				</p>
			</div>
			<div className={`container d-flex justify-content-end`}>
				<p style={{ maxWidth: '60%' }}>
					<h2>What Our Members has to say</h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum sapien tortor, sit
					amet eleifend lorem sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt eu massa. Nam
					id lorem fringilla, semper elit in, convallis metus. Fusce dignissim pharetra urna, non tempor leo.
					Proin sagittis eget mi id tincidunt. Vivamus maximus lacus ac sapien aliquet, accumsan bibendum diam
					mollis. Praesent aliquet eros tincidunt, viverra metus ac, consequat erat. Praesent vel tempus
					libero. Curabitur in rhoncus dui. In hac habitasse platea dictumst. Sed nisi erat, posuere non mi
					nec, ultrices imperdiet neque. Nulla pellentesque accumsan condimentum. Nullam sed mattis sem.
					Phasellus pharetra, urna vel faucibus tempus, sapien ipsum elementum risus, vel volutpat est felis
					ornare nisi. Fusce vulputate dolor eget semper viverra. Maecenas finibus bibendum nibh.
				</p>
			</div>
			<div className={`container`}>
				<div className={`text-center`}>
					<h3>Subscribe to get the most of us</h3>
					<p>Read unlimited articles. Write unlimited. Do unlimited. Be unlimited</p>
					<button className={`btn btn-outline-success`}>Subscribe</button>
				</div>
			</div>
			<div className={`container text-center py-5`}>
				<h1 className={`text-capitalize`}>So what are you waiting for?</h1>
				<h3>Learn More with us</h3>
				<button className={`btn btn-success`}>Get started</button>
			</div>
		</div>
	);
};

export default LandingPage;
