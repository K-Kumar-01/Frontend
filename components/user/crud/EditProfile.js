import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './EditProfile.module.css';

const EditProfile = (props) => {
	const [values, setValues] = useState({
		name: null,
		email: null,
		username: null,
		opassword: null,
		npassword: null,
		cpassword: null,
	});

	let { name, email, username, opassword, npassword, cpassword } = values;
	useEffect(() => {
		setValues({ ...values });
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const showForm = () => {
		return (
			<section className={'my-4'}>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Name"
						name="name"
						autoComplete="off"
						value={name}
						onChange={handleChange('name')}
					/>
					<label htmlFor="name">Name</label>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="text"
						className="form-control"
						id="username"
						placeholder="Username"
						name="username"
						autoComplete="off"
						value={username}
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="example@url.com"
						name="email"
						autoComplete="off"
						value={email}
						disabled
					/>
					<label htmlFor="email">Email</label>
				</div>

				<hr />
				<h3>Password details</h3>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="password"
						className={`form-control`}
						id="password"
						placeholder="Old Password"
						autoComplete="off"
						value={opassword}
					/>
					<label htmlFor="password">Old Password</label>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="npassword"
						className={`form-control`}
						id="npassword"
						placeholder="Minimum 6 characters"
						autoComplete="off"
						value={npassword}
					/>
					<label htmlFor="cpassword">New Password</label>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="cpassword"
						className={`form-control`}
						id="cpassword"
						placeholder="*******"
						autoComplete="off"
						value={cpassword}
					/>
					<label htmlFor="cpassword">Confirm New Password</label>
				</div>
			</section>
		);
	};

	return (
		<div className={`container my-3`}>
			<form className={`row`}>
				<section className={`col-md-6`}>
					Image here
					<br />
					<button className={`btn btn-primary`}>Change Image</button>
					<div>
						<label htmlFor="about">
							<h4>About you</h4>
						</label>
						<textarea placeholder="Let people know more about you" className={`form-control`}></textarea>
					</div>
				</section>
				<section className={`col-md-6`}>{showForm()}</section>
			</form>
			<div className={`col-md-4 mx-auto my-3`}>
				<button
					type="submit"
					className={`btn btn-lg btn-primary btn-block text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default EditProfile;
