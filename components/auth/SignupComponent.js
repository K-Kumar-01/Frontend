import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import styles from './SignupComponent.module.css';
import Link from 'next/link';
import { createUser } from '../../actions/auth';



const FormWithToasts = () => {
	const { addToast } = useToasts();
	const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
	// const [loading, setLoading] = useState(false);
	const onSubmit = (data, event) => {
		event.preventDefault();

		createUser(data)
			.then((response) => {
				console.log(response);
				addToast(`${response.message}`, {
					appearance: 'success',
					autoDismiss: true,
				});
			})
			.catch((err) => {
				addToast(`${err.message}`, {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(err);
			});
	};

	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="John"
						name="name"
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.name && { border: '1px solid red' }}
					/>
					<p className={`text-danger ${styles.errors}`}>{errors.name && 'Name is required'}</p>
				</div>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						className="form-control"
						id="username"
						placeholder="John123"
						name="username"
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.username && { border: '1px solid red' }}
					/>
					<p className={`text-danger ${styles.errors}`}>{errors.username && 'Username is required'}</p>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
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
					<p className={`text-danger ${styles.errors}`}>{errors.email && 'Email is required'}</p>
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
				<div className="form-group">
					<label htmlFor="cpassword">Confirm Password</label>
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
					<p className={`text-danger ${styles.errors}`}>{errors.cpassword && 'Passwords do not match'}</p>
				</div>
				<div className="text-center">
					<button type="submit" className="btn btn-primary btn-lg">
						Signup
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className={`row d-flex justify-content-center mx-auto pt-5 `}>
			<div className={`col-lg-6 col-md-8 col-sm-10 ${styles.container}`}>
				<div className={`text-center`}>
					<h2>Signup</h2>
				</div>
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
	);
};

const SignupComponent = () => {
	return (
		<ToastProvider>
			{/* {loading && <Spinner />} */}
			<FormWithToasts />
		</ToastProvider>
	);
};

export default SignupComponent;
