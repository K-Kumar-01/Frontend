import React from 'react';
import EditProfile from '../../../components/user/crud/EditProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';

const EditUser = () => {
	return (
		<div>
			<Layout>
				<Header />
				<EditProfile />
				<Footer />
			</Layout>
		</div>
	);
};

export default EditUser;
