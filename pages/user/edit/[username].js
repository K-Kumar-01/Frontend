import React, { useEffect, useState } from 'react';
import EditProfile from '../../../components/user/crud/EditProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import { getUserDetails } from '../../../actions/user';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { authenticate } from '../../../helpers/auth';
import { COOKIE_NAME } from '../../../appConstants';
import Preloader from '../../../components/spinner/Preloader';

const EditUser = (props) => {
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		console.log('Hello');
		let decodedData = authenticate(COOKIE_NAME);
		setLoggedIn(decodedData);
		if (!decodedData || !decodedData.username) {
			console.log('YES');
			router.push('/signin');
		} else if (!props.error) {
			if (decodedData.username.toString() !== router.query.username.toString()) {
				router.push(`/user/edit/${decodedData.username}`);
			}
		}
	}, []);

	return (
		<React.Fragment>
			{loggedIn ? (
				<div>
					{props.error ? (
						<Error statusCode={props.error} />
					) : (
						<Layout>
							<Header />
							<EditProfile userDetails={props.userDetails} />
							<Footer />
						</Layout>
					)}
				</div>
			) : (
				<div>
					<Preloader/>
				</div>
			)}
		</React.Fragment>
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
		return { error: response.error.status };
	} else {
		return { userDetails: response.response.data };
	}
};

export default EditUser;
