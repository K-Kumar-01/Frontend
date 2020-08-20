import React from 'react';
import SigninComponent from '../components/auth/SigninComponent';
import NProgress from '../components/NProgress/Nprogress';

const Signin = () => {
	return (
		<NProgress>
			<SigninComponent />
		</NProgress>
	);
};

export default Signin;
