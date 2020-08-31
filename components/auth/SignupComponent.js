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
				if (response.error) {
					addToast(`${response.error}`, {
						appearance: 'error',
						autoDismiss: true,
					});
				} else {
					addToast(`${response.message}`, {
						appearance: 'success',
					});
				}
			})
			.catch((err) => {
				addToast(`${err}`, {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(err);
			});
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
						ref={register({ required: true })}
						autoComplete="off"
						style={errors.username && { border: '1px solid red' }}
					/>
					<label htmlFor="username">Username</label>
					<p className={`text-danger ${styles.errors}`}>{errors.username && 'Username is required'}</p>
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
				>
					Signup
				</button>
			</form>
		);
	};
	return (
		// <div className={`row d-flex justify-content-center mx-auto pt-5 `}>
		// 	<div className={`col-lg-6 col-md-8 col-sm-10 ${styles.container}`}>
		// 		<div className={`text-center`}>
		// 			<h2>Signup</h2>
		// 		</div>
		// 		{showForm()}
		// <div className={`d-flex justify-content-between`}>
		// 	<p>
		// 		Already Registered?
		// 		<Link href="/signin">
		// 			<a>Signin</a>
		// 		</Link>
		// 	</p>
		// 	<p>
		// 		<Link href="/">
		// 			<a>Back to Main Page</a>
		// 		</Link>
		// 	</p>
		// </div>
		// 	</div>
		// </div>
		<div className="container-fluid">
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
									{/* <form>
										<div className="form-label-group">
											<input
												type="email"
												id="inputEmail"
												className="form-control"
												placeholder="Email address"
												required
												autofocus
											/>
											<label for="inputEmail">Email address</label>
										</div>

										<div className="form-label-group">
											<input
												type="password"
												id="inputPassword"
												className="form-control"
												placeholder="Password"
												required
											/>
											<label for="inputPassword">Password</label>
										</div>

										<button
											className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
											type="submit"
										>
											Sign in
										</button>
									</form> */}
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
			{/* {loading && <Spinner />} */}
			<FormWithToasts />
		</ToastProvider>
	);
};

export default SignupComponent;
