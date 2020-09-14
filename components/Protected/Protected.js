import React, { useEffect } from 'react';
import { COOKIE_NAME } from '../../appConstants';
import { authenticate } from '../../helpers/auth';
import { useRouter } from 'next/router';

const Protected = (props) => {
	const router = useRouter();
	useEffect(() => {
		if (router.pathname.startsWith('/signup') || router.pathname.startsWith('/signin')) {
			if (authenticate(COOKIE_NAME)) {
				let decoded = authenticate(COOKIE_NAME);
				router.push(`/user/profile/${decoded.username}`);
			}
		} else {
			if (!authenticate(COOKIE_NAME)) {
				router.push('/signin');
			}
		}
	});
	return <React.Fragment>{props.children}</React.Fragment>;
};

export default Protected;
