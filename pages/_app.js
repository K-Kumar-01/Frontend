import { motion } from 'framer-motion';

import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import '../css/global.css';

export default function App({ Component, pageProps, router }) {
	return (
		<motion.div
			key={router.route}
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {
					scale: 0.8,
					opacity: 0,
				},
				visible: {
					scale: 1,
					opacity: 1,
					transition: {
						delay: 0.4,
					},
				},
			}}
		>
			<Component {...pageProps} />
		</motion.div>
	);
}
