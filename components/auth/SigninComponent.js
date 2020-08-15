import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import Router from 'next/router';

import styles from './SignupComponent.module.css';
import { loginUser } from '../../actions/auth';

const FormWithToasts = () => {
	const { addToast } = useToasts();
	const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
	const onSubmit = (data, event) => {
		event.preventDefault();
		loginUser(data)
			.then((response) => {
				if (response.error) {
					addToast(`${response.error}`, {
						appearance: 'error',
						autoDismiss: true,
					});
				} else {
					addToast(`${response.message}`, {
						appearance: 'success',
						autoDismiss: true,
					});
					Router.push('/');
				}
			})
			.catch((err) => {
				console.log(err);
				addToast(`${err}`, {
					appearance: 'error',
					autoDismiss: true,
				});
			});
	};

	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="username"
						className="form-control"
						id="username"
						placeholder="name123"
						name="username"
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.username && { border: '1px solid red' }}
					/>
					<p className={`text-danger ${styles.errors}`}>{errors.username && 'Username is required'}</p>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
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
					<p className={`text-danger ${styles.errors}`}>
						{errors.password && 'Password must be atleast 6 character long'}
					</p>
				</div>
				<div className="text-center">
					<button type="submit" className="btn btn-primary btn-lg">
						Signin
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className={`row d-flex justify-content-center mx-auto pt-5 `}>
			<div className={`col-lg-6 col-md-8 col-sm-10 ${styles.container}`}>
				<div className={`text-center`}>
					<h2>Signin</h2>
				</div>
				{showForm()}
				<div className={`d-flex justify-content-between`}>
					<p>
						New User?
						<Link href="/signup">
							<a>Signup</a>
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
	);
};

const SigninComponent = () => {
	return (
		<ToastProvider>
			<FormWithToasts />
		</ToastProvider>
	);
};

export default SigninComponent;
