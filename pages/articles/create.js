import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArticleCreate from '../../components/crud/article/ArticleCreate';
import NProgress from '../../components/NProgress/Nprogress';

const createArticle = () => {
	return (
		<main>
			<NProgress>
				<Header />
				<ArticleCreate />
				<Footer />
			</NProgress>
		</main>
	);
};

export default createArticle;
