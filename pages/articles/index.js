import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getCategoriees } from '../../actions/category';

import styles from './index.module.css';
import Layout from '../../components/Layout';


const Articles = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCats();
	}, []);

	const getCats = async () => {
		try {
			// console.log('mew here');
			const result = await getCategoriees();
			setCategories(result.categories);
			console.log(result);
			// console.log('mre there');
		} catch (error) {
			console.log(error);
		}
	};

	const renderCategories = () => {
		return categories.map((c) => {
			return (
				<div key={c._id} className={`mr-3 ${styles.categories}`} style={{ cursor: 'pointer' }}>
					{c.name}
				</div>
			);
		});
	};

	return (
		<Layout>
			<Header />
			<div className={`mx-auto my-3 py-3 px-3 d-flex`} style={{ width: '90%', overflowX: 'auto' }}>
				{categories.length === 0 ? null : renderCategories()}
			</div>
			<Footer />
		</Layout>
	);
};

export default Articles;
