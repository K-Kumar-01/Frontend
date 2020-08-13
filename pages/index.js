import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';

const Index = () => {
	return (
		<>
			<Header />
			<LandingPage/>
			<Footer />
		</>
	);
};

export default Index;
