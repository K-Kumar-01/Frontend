import React from 'react';
import Head from 'next/head';

import SignupComponent from '../components/auth/SignupComponent';
import Layout from '../components/Layout';


const Signup = () => {
	// for seo friendly sites
	// const head = () => {
	// 	return (
	// 		<Head>
	// 			<title>Signup | TITAN READ</title>
	// 			<meta name="description" content={`Make your account on TITAN READ`} />
	// 			<link rel="canonical" href={`/signup`} />
	// 			<meta property="og:title" content={`SIGNUP | TITAN READ`} />
	// 			<meta property="og:description" content={`Create account TITAN READ`} />
	// 			<meta property="og:type" content="website" />
	// 			<meta property="og:url" content={`/signup`} />
	// 			<meta property="og:site_name" content={`TITAN READ`} />

	// 			<meta property="og:image" content={`${signupImage}`} />
	// 			<meta property="og:image:secure_url" content={`${signupImage}`} />
	// 			<meta property="og:image:type" content="image/jpeg" />
	// 			{/* <meta property="fb:app_id" content={FB_APP_ID} /> */}
	// 		</Head>
	// 	);
	// };

	return (
		<Layout>
			<SignupComponent />
		</Layout>
	);
};

export default Signup;
