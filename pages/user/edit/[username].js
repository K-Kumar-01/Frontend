import React, { useEffect } from 'react';
import EditProfile from '../../../components/user/crud/EditProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import Protected from '../../../components/Protected/Protected';
import { getUserDetails } from '../../../actions/user';
import Error from 'next/error';
import { useRouter } from 'next/router';

const EditUser = (props) => {
	const router = useRouter();

	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<>
			{props.error ? (
				<Error statusCode={props.error} />
			) : (
				<Protected>
					<Layout>
						<Header />
						<EditProfile userDetails={props.userDetails} />
						<Footer />
					</Layout>
				</Protected>
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
	return true;
};

export default EditUser;
