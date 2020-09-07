import React from 'react';
import SigninComponent from '../components/auth/SigninComponent';
import Layout from '../components/Layout';
import Protected from '../components/Protected/Protected';

const Signin = () => {
	return (
		<Protected>
			<Layout>
				<SigninComponent />
			</Layout>
		</Protected>
	);
};

export default Signin;
