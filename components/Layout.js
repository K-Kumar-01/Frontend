import Header from './Header';
import Footer from './Footer';
import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = (props) => {
	return (
		<React.Fragment>
			<div>{props.children}</div>
		</React.Fragment>
	);
};

export default Layout;
