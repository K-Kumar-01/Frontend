import React from 'react';
import Link from 'next/link';
const membershipData = [
	{
		title: 'Monthly Subscription',
		pricing: '₹199',
	},
	{ title: 'Annual Subscription', pricing: '₹1799' },
	{ title: 'Custom Subscription', pricing: 'Custom Pricing' },
];

const Membership = () => {
	const showPlans = () => {
		return membershipData.map((data, i) => {
			return (
				<div className={`col-md-4 col-sm-12`} key={`membership-${i}`}>
					<div className="card ">
						<div className={`card-header`}>
							<h4>{data.title}</h4>
						</div>
						<div className={`card-body`}>{data.pricing}</div>
						<div className="text-center pb-3">
							<button className={`btn btn-outline-success`}>Get {data.title}</button>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div style={{ width: '100vw', height: '100vh', backgroundColor: '#efefef' }}>
			<div
				className={`container d-flex justify-content-center align-items-center`}
				style={{ width: '100%', height: '100vh' }}
			>
				<section>
					<div className={`text-center pb-4`}>
						<h1>Plans Available</h1>
					</div>
					<div className="row">
						<div className="card-deck">{showPlans()}</div>
					</div>
					<div className={`text-center`}>
						Return to{' '}
						<Link href="/">
							<a>Home Page</a>
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Membership;
