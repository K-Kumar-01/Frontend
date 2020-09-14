import React, { useEffect } from 'react';
import Error from 'next/error';

import UserProfile from '../../../components/user/UserProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import { getUserDetails } from '../../../actions/user';

const UserIndex = (props) => {
	useEffect(() => {
		console.log(props);
	}, []);
	return (
		<React.Fragment>
			{props.error ? (
				<Error statusCode={props.error} />
			) : (
				<Layout>
					<Header></Header>
					<UserProfile />
					<Footer></Footer>
				</Layout>
			)}
		</React.Fragment>
	);
};

UserIndex.getInitialProps = async (props) => {
	let response;

	try {
		response = await getUserDetails(props.query.username);
	} catch (error) {
		console.log(error);
		return { error: 500 };
	}

	if (response.error) {
		return { error: response.error.status };
	} else {
		return { userDetails: response.response.data };
	}
};

export default UserIndex;
