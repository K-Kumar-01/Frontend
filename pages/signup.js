import React from 'react';

import SignupComponent from '../components/auth/SignupComponent';
import NProgress from '../components/NProgress/Nprogress';

const Signup = () => {
	return (
		<NProgress>
			<SignupComponent />
		</NProgress>
	);
};

export default Signup;
