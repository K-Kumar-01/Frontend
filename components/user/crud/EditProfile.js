import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastProvider, useToasts } from 'react-toast-notifications';

import styles from './EditProfile.module.css';
import LoadingSpinner from '../../spinner/LoadingSpinner';
import { updateUser } from '../../../actions/user';
import { removeCookie, setCookie } from '../../../helpers/auth';
import { COOKIE_NAME } from '../../../appConstants';
import { useRouter } from 'next/router';

const ToastedComponent = (props) => {
	const { addToast } = useToasts();

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// IMage component
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(true);

	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const pickedhandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
	};

	// /image component

	const { register, handleSubmit, errors, formState, watch } = useForm({
		mode: 'onTouched',
		defaultValues: {
			name: props.userDetails.userInfo.name,
			email: props.userDetails.userInfo.email,
			username: props.userDetails.userInfo.username,
			about: props.userDetails.userInfo.about,
		},
	});

	useEffect(() => {
		setPreviewUrl(props.userDetails.userInfo.image);
	}, []);

	const onSubmit = async (data, event) => {
		// console.log(data);
		// console.log('hello');
		event.preventDefault();
		// return ;
		setLoading(true);
		let formdata = new FormData();

		formdata.append('username', data.username);
		formdata.append('name', data.name);
		formdata.append('about', data.about);
		if (file) {
			formdata.append('image', file);
		}

		if (data.oldpassword) {
			formdata.append('oldpassword', data.oldpassword);
			formdata.append('newpassword', data.newpassword);
		}

		let response;
		try {
			response = await updateUser(props.userDetails.userInfo.username, formdata);
			console.log(response);
			setLoading(false);
			if (response.error) {
				addToast(`${response.error}`, {
					appearance: 'error',
					autoDismiss: true,
				});
			} else {
				removeCookie(COOKIE_NAME);
				setCookie(COOKIE_NAME, response.token);
				addToast(`${response.message}`, {
					appearance: 'success',
					autoDismiss: true,
				});
				setTimeout(() => {
					router.push(`/user/edit/${response.username}`);
				}, 1000);
			}
		} catch (error) {
			console.log('********************************');
			setLoading(false);
			addToast(`${error.message}`, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
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
						autoComplete="off"
						ref={register()}
						value={props.userDetails.userInfo.email}
						disabled
					/>
					<label htmlFor="email">Email</label>
				</div>

				<hr />
				<h3>Password details</h3>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="oldpassword"
						className={`form-control`}
						id="oldpassword"
						placeholder="Minimum 6 characters"
						ref={register({ minLength: 6 })}
						autoComplete="off"
						style={errors.oldpassword && { border: '1px solid red' }}
					/>
					<label htmlFor="oldpassword">Old Password</label>
					<p className={`text-danger ${styles.errors}`}>
						{errors.oldpassword && 'Password must be atleast 6 character long'}
					</p>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="newpassword"
						className={`form-control`}
						id="newpassword"
						placeholder="Minimum 6 characters"
						ref={register({ required: watch('oldpassword'), minLength: 6 })}
						autoComplete="off"
						style={errors.newpassword && { border: '1px solid red' }}
					/>
					<label htmlFor="newpassword">New Password</label>
					<p className={`text-danger ${styles.errors}`}>
						{errors.newpassword && 'Password must be atleast 6 character long'}
					</p>
				</div>
				<div className={`${styles.formLabelGroup}`}>
					<input
						type="password"
						name="cpassword"
						className={`form-control`}
						id="cpassword"
						placeholder="•••••••"
						ref={register({ validate: (value) => value === watch('newpassword') })}
						autoComplete="off"
						style={errors.cpassword && { border: '1px solid red' }}
					/>
					<label htmlFor="cpassword">Confirm Password</label>
					<p className={`text-danger ${styles.errors}`}>{errors.cpassword && 'Passwords do not match'}</p>
				</div>
			</section>
		);
	};

	return (
		<div className={`container my-3`}>
			{loading && <LoadingSpinner asOverlay />}
			<form className={`row`} onSubmit={handleSubmit(onSubmit)}>
				<section className={`col-md-6`}>
					<div>
						<input
							type="file"
							ref={filePickerRef}
							style={{ display: 'none' }}
							accept=".jpg,.pmg,.jpeg"
							onChange={pickedhandler}
						/>
						<div className={`${styles.imageUpload} 'center'`}>
							<div className={`${styles.imageUploadPreview}`}>
								{previewUrl && <img src={previewUrl} alt="Preview" />}
								{!previewUrl && <p>Profile picture.</p>}
							</div>
							<button type="button" className={`btn btn-primary`} onClick={pickImageHandler}>
								PICK IMAGE
							</button>
						</div>
						{!previewUrl && !isValid && <p>Invalid image type chosen</p>}
					</div>
					<br />
					<div>
						<label htmlFor="about">
							<h4>About you</h4>
						</label>
						<textarea
							name="about"
							ref={register({ minLength: 25 })}
							placeholder="Let people know more about you"
							className={`form-control`}
							style={errors.about && { border: '1px solid red' }}
						></textarea>
						<p className={`text-danger ${styles.errors}`}>
							{errors.about && 'Must be atleast 20 characters long'}
						</p>
					</div>
				</section>
				<section className={`col-md-6`}>{showForm()}</section>
				<div className={`col-md-4 mx-auto my-3`}>
					<button
						type="submit"
						className={`btn btn-lg btn-primary btn-block text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

const EditProfile = (props) => {
	return (
		<ToastProvider>
			<ToastedComponent userDetails={props.userDetails} />
		</ToastProvider>
	);
};

export default EditProfile;
