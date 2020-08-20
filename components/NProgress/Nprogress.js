import React from 'react';
import Nprogress from 'nprogress';
import Router from 'next/router';

Nprogress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const NProgress = (props) => {
	return (
		<React.Fragment>
			<div>{props.children}</div>
		</React.Fragment>
	);
};

export default NProgress;
