import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import Router from 'next/router';

import styles from './SignupComponent.module.css';
import { createUser } from '../../actions/auth';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { setCookie, decodeCookie } from '../../helpers/auth';
import { COOKIE_NAME } from '../../appConstants';

const FormWithToasts = () => {
	const { addToast } = useToasts();
	const { register, handleSubmit, errors, watch, formState } = useForm({
		mode: 'onTouched',
	}); // initialise the hook
	const [loading, setLoading] = useState(false);
	const onSubmit = async (data, event) => {
		// console.log(data);
		event.preventDefault();
		setLoading(true);
		let formdata = new FormData();
		formdata.append('username', data.username);
		formdata.append('name', data.name);
		formdata.append('email', data.email);
		formdata.append('password', data.password);

		let response;
		try {
			response = await createUser(formdata);
			// console.log(response);
			setLoading(false);
			if (response.error) {
				addToast(`${response.error}`, {
					appearance: 'error',
					autoDismiss: true,
				});
			} else {
				setCookie(COOKIE_NAME, response.token);
				addToast(`${response.message}`, {
					appearance: 'success',
				});
				Router.push(`/articles`);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			addToast(`${error.message}`, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	};

	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Name"
						name="name"
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.name && { border: '1px solid red' }}
					/>
					<label htmlFor="name">Name</label>
					<p className={`text-danger ${styles.errors}`}>{errors.name && 'Name is required'}</p>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="text"
						className="form-control"
						id="username"
						placeholder="Username"
						name="username"
						ref={register({ required: true, pattern: /^[a-zA-Z0-9_.-]*$/ })}
						autoComplete="off"
						style={errors.username && { border: '1px solid red' }}
					/>
					<label htmlFor="username">Username</label>
					<p className={`text-danger ${styles.errors}`}>
						{errors.username?.type === 'required' && 'Username is required'}
						{errors.username?.type === 'pattern' &&
							'Username can only conatin characters numbers and underscores'}
					</p>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="example@url.com"
						name="email"
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.email && { border: '1px solid red' }}
					/>
					<label htmlFor="email">Email</label>
					<p className={`text-danger ${styles.errors}`}>{errors.email && 'Email is required'}</p>
				</div>

				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="password"
						className={`form-control`}
						id="password"
						placeholder="Minimum 6 characters"
						ref={register({ required: true, minLength: 6 })}
						autoComplete="off"
						style={errors.password && { border: '1px solid red' }}
					/>
					<label htmlFor="password">Password</label>
					<p className={`text-danger ${styles.errors}`}>
						{errors.password && 'Password must be atleast 6 character long'}
					</p>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="cpassword"
						className={`form-control`}
						id="cpassword"
						placeholder="•••••••"
						ref={register({ validate: (value) => value === watch('password') })}
						autoComplete="off"
						style={errors.cpassword && { border: '1px solid red' }}
					/>
					<label htmlFor="cpassword">Confirm Password</label>
					<p className={`text-danger ${styles.errors}`}>{errors.cpassword && 'Passwords do not match'}</p>
				</div>

				<button
					type="submit"
					className={`btn btn-lg btn-primary btn-block text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
					disabled={Object.keys(formState.touched).length === 0 || Object.keys(errors).length !== 0}
				>
					Signup
				</button>
			</form>
		);
	};
	return (
		<div className="container-fluid">
			{loading && <LoadingSpinner asOverlay />}
			<div className="row no-gutter">
				<div className={`d-none d-md-flex col-md-4 col-lg-6 ${styles.bgImage}`}></div>
				<div className="col-md-8 col-lg-6">
					<div className={`${styles.login} d-flex align-items-center py-5`}>
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-8 mx-auto">
									<h3 className={`${styles.loginHeading} mb-4 text-center`}>
										Hello, Wanderer! <br />
										<br />
										<h5>Enter your personal details and start journey with us</h5>
									</h3>
									{showForm()}
									<div className={`d-flex justify-content-between`}>
										<p>
											Already Registered?
											<Link href="/signin">
												<a>Signin</a>
											</Link>
										</p>
										<p>
											<Link href="/">
												<a>Back to Main Page</a>
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const SignupComponent = () => {
	return (
		<ToastProvider>
			<FormWithToasts />
		</ToastProvider>
	);
};

export default SignupComponent;
