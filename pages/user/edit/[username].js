import React from 'react';
import EditProfile from '../../../components/user/crud/EditProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import Protected from '../../../components/Protected/Protected';

const EditUser = () => {
	return (
		<Protected>
			<Layout>
				<Header />
				<EditProfile />
				<Footer />
			</Layout>
		</Protected>
	);
};

export default EditUser;
