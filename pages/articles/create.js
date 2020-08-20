import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArticleCreate from '../../components/crud/article/ArticleCreate';
import Layout from '../../components/Layout';


const createArticle = () => {
	return (
		<main>
			<Layout>
				<Header />
				<ArticleCreate />
				<Footer />
			</Layout>
		</main>
	);
};

export default createArticle;
