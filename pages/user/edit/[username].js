import React, { useEffect, useState } from 'react';
import EditProfile from '../../../components/user/crud/EditProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import Protected from '../../../components/Protected/Protected';
import { getUserDetails } from '../../../actions/user';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { authenticate } from '../../../helpers/auth';
import { COOKIE_NAME } from '../../../appConstants';

const EditUser = (props) => {
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		let decodedData = authenticate(COOKIE_NAME);
		setLoggedIn(decodedData);
		if (!decodedData || !decodedData.username) {
			router.push('/signin');
		} else if (!props.error) {
			if (decodedData.username.toString() !== router.query.username.toString()) {
				router.push(`/user/edit/${decodedData.username}`);
			}
		}
	}, []);

	return (
		<>
			{loggedIn ? (
				<>
					{props.error ? (
						<Error statusCode={props.error} />
					) : (
						<Layout>
							<Header />
							<EditProfile userDetails={props.userDetails} />
							<Footer />
						</Layout>
					)}
				</>
			) : (
				<div>
					Hello
				</div>
			)}
		</>
	);
};

EditUser.getInitialProps = async (props) => {
	let response;

	try {
		response = await getUserDetails(props.query.username);
	} catch (error) {
		return { error: 500 };
	}

	if (response.error) {
		console.log('Hello');
		return { error: response.error.status };
	} else {
		return { userDetails: response.response.data };
	}
};

export default EditUser;
