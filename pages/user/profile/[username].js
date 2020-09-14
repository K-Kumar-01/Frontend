import React from 'react';
import UserProfile from '../../../components/user/UserProfile';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';


const UserIndex = () => {
	return (
		<Layout>
			<Header></Header>
			<UserProfile />
			<Footer></Footer>
		</Layout>
	);
};

export default UserIndex;
