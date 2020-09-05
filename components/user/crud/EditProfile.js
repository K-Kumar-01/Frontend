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
			<form className={'row my-4'}>
				<div className="col-lg-6 col-md-9">
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
				</div>
				<div className="col-lg-6 col-md-9">
					<label htmlFor="about">
						<h4>About you</h4>
					</label>
					<textarea placeholder="Let people know more about you" className={`form-control`}></textarea>
				</div>
				<div className={`col-md-4 mx-auto my-3`}>
					<button
						type="submit"
						className={`btn btn-lg btn-primary btn-block text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
					>
						Save Changes
					</button>
				</div>
			</form>
		);
	};

	return (
		<div className={`container my-3`}>
			<div className={`row`}>
				<div className={`col-md-6`}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum est a metus sodales luctus.
					Maecenas placerat, nunc ut accumsan luctus, metus eros interdum erat, sit amet sagittis arcu ex id
					turpis. Vivamus dolor est, consectetur vel pharetra id, porttitor nec arcu. Nulla molestie, odio nec
					dictum accumsan, nisi massa condimentum justo, id convallis metus sapien ut purus. Nam iaculis
					sapien arcu, sit amet mollis ipsum gravida sed. Praesent vel erat purus. Pellentesque habitant morbi
					tristique senectus et netus et malesuada fames ac turpis egestas. Etiam magna ante, venenatis sed
					tempus ac, euismod consectetur nunc. Quisque consequat risus eu convallis lacinia. Mauris consequat
					metus in sem mollis eleifend. Pellentesque volutpat velit eget enim sagittis, quis varius nibh
					venenatis. Pellentesque facilisis lectus quis turpis luctus eleifend. Nam enim neque, interdum ut
					eros sed, semper ultrices felis. Donec dignissim quis turpis ac consectetur. Maecenas congue ante ut
					massa tincidunt aliquam.
				</div>
				<div className={`col-md-6 d-flex justify-content-around align-items-center `}>
					<button className={`btn btn-primary`}>Change Image</button>
				</div>
			</div>
			<section>{showForm()}</section>
		</div>
	);
};

export default EditProfile;
