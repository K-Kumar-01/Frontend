import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import NProgress from '../components/NProgress/Nprogress';

const Index = () => {
	return (
		<NProgress>
			{/* <Header /> */}
			<LandingPage />
			<Footer />
		</NProgress>
	);
};

export default Index;
