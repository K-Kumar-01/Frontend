import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArticleCreate from '../../components/crud/article/ArticleCreate';

const createArticle = () => {
	return (
		<main>
			<Header />
            <ArticleCreate/>
			<Footer />
		</main>
	);
};

export default createArticle;
