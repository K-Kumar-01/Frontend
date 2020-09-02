import { useState, useEffect } from 'react';
import Dante from 'Dante2';
import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image.js';
import { VideoBlockConfig } from 'Dante2/package/lib/components/blocks/video.js';
import { useDropzone } from 'react-dropzone';
import { ToastProvider, useToasts } from 'react-toast-notifications';

import Loading from '../../spinner/Loading';
import { getCategoriees } from '../../../actions/category';
import styles from './ArticleCreate.module.css';
import { createArticle } from '../../../actions/article';

const ComponentWithToasts = () => {
	const { addToast } = useToasts();
	const thumbsContainer = {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 16,
	};

	const thumb = {
		display: 'inline-flex',
		borderRadius: 2,
		border: '1px solid #eaeaea',
		marginBottom: 8,
		marginRight: 8,
		width: 100,
		height: 100,
		padding: 4,
		boxSizing: 'border-box',
	};

	const thumbInner = {
		display: 'flex',
		minWidth: 0,
		overflow: 'hidden',
	};

	const img = {
		display: 'block',
		width: 'auto',
		height: '100%',
	};
	// endstyling file image container

	const [files, setFiles] = useState([]);
	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	function Previews(props) {
		const { getRootProps, getInputProps } = useDropzone({
			accept: 'image/*',
			minSize: false,
			onDrop: (acceptedFiles) => {
				setFiles(
					acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					)
				);
			},
		});

		const thumbs = files.map((file) => (
			<div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img src={file.preview} style={img} />
				</div>
			</div>
		));

		return (
			<section className="container">
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<p style={{ border: '3px dashed #EEEEEE', backgroundColor: '#FAFAFA', padding: '1rem' }}>
						Drag 'n' drop some image here, or click to select image
					</p>
				</div>
				<aside style={thumbsContainer}>{thumbs}</aside>
			</section>
		);
	}

	// the above code is for file upload

	const [categories, setCategories] = useState([]);
	const [checkedCat, setCheckedCat] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState(``);
	const [extracted, setExtracted] = useState('');

	useEffect(() => {
		getCats();
	}, []);

	const getCats = async () => {
		try {
			// console.log('mew here');
			const result = await getCategoriees();
			setCategories(result.categories);
			// console.log('mre there');
		} catch (error) {
			addToast(`${error.message}`, {
				appearance: 'error',
				autoDismiss: false,
			});
			console.log(error);
		}
	};

	const handleToggleCat = (c) => {
		// console.log(c);
		const all = [...checkedCat];
		const checkedIndex = checkedCat.indexOf(c);
		if (checkedIndex === -1) {
			all.push(c);
		} else {
			all.splice(checkedIndex, 1);
		}
		setCheckedCat(all);
	};

	const showCategories = () => {
		if (categories) {
			return categories.map((c) => {
				return (
					<li key={c._id} className="list-unstyled text-capitalize">
						<input
							type="checkbox"
							className="mr-2"
							onChange={() => {
								handleToggleCat(c._id);
							}}
						/>
						<label className="form-check-label">{c.name}</label>
					</li>
				);
			});
		}
	};

	// to process the first 200 characters
	const extraction = (data) => {
		let s = '';
		data.blocks.forEach((b) => {
			if (s.length < 200) {
				if (b.type.toLowerCase() !== 'image' && b.entityRanges.length === 0) {
					if (s.length + b.text.length >= 200) {
						let diff = 200 - s.length;
						s += b.text.substr(0, diff);
					} else {
						s += b.text + '\n';
					}
				}
			}
		});

		if (s.length < 200) {
			return false;
		} else {
			return s;
		}
	};

	const creationArticleArea = () => {
		return (
			<React.Fragment>
				<div className={`px-2`}>
					<div className="row">
						<div className="col-md-8 col-12">
							<div className="form-group">
								<label htmlFor="title" className="col-form-label">
									<h4>Blog title</h4>
								</label>
								<input
									type="title"
									className="form-control"
									id="title"
									placeholder="New blog"
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									autoComplete="off"
								/>
								<p className="small text-muted">Cannot change later</p>
							</div>

							<div className="form-group">
								<label className="col-form-label">
									<h4>Upload Featured Image</h4>
								</label>
								<Previews />
							</div>

							<Dante
								content={body}
								onChange={(editor) => {
									setBody(editor.emitSerializedOutput());
									setExtracted(extraction(editor.emitSerializedOutput()));
								}}
								widgets={[
									ImageBlockConfig({
										options: {
											upload_url: 'http://localhost:8000/uploads',
											upload_callback: (ctx, img) => {
												alert('file uploaded: ' + ctx.data.url);
											},
											upload_error_callback: (ctx, img) => {
												console.log(ctx);
											},
										},
									}),
									VideoBlockConfig({
										options: {
											upload_url: 'http://localhost:8000/uploads',
											upload_callback: (ctx, img) => {
												console.log('file uploaded: ' + ctx.data.url);
											},
											upload_error_callback: (ctx, img) => {
												debugger;
												console.log(ctx);
											},
										},
									}),
								]}
							/>
						</div>
						<div className="col-md-4 col-12">
							{categories.length === 0 ? (
								<Loading />
							) : (
								<div className="form-group">
									<label htmlFor="title" className="col-form-label">
										<h4>Blog Categories</h4>
										<p className="small text-muted">
											Blog must belong to atleast one of the following categories
										</p>
									</label>
									<ul style={{ maxHeight: '200px', overflowY: 'auto' }}>{showCategories()}</ul>
								</div>
							)}
						</div>
					</div>
					<div className="row mb-3" onClick={() => handleSubmit()}>
						<button className={`${styles.customBtn} ${styles.btn1}`}>Publish</button>
					</div>
				</div>
			</React.Fragment>
		);
	};

	const checkValidation = () => {
		if (title === '') {
			return 'Post must have a title';
		} else if (!extracted || extracted.length < 200) {
			return 'Post must be atleast 200 characters long';
		} else if (checkedCat.length === 0) {
			return 'No category selected';
		}
		return false;
	};

	const handleSubmit = async () => {
		let res = checkValidation();
		if (res) {
			addToast(`${res}`, {
				appearance: 'error',
				autoDismiss: true,
			});
			return false;
		}

		let formData = new FormData();
		formData.append('title', title);
		formData.append('mdesc', extracted);
		formData.append('body', body);
		formData.append('categories', checkedCat);
		formData.append('image', files[0]);

		let response;
		try {
			response = await createArticle(formData);
		} catch (error) {
			addToast(`${error}`, {
				appearance: 'error',
				autoDismiss: true,
			});
			return false;
		}

		addToast(`${response.data.message}`, {
			appearance: 'success',
			autoDismiss: false,
		});
	};

	return (
		<div className={`${styles.heightedcontainer}`}>
			<div className={`container `}>{creationArticleArea()}</div>
		</div>
	);
};

const ArticleCreate = () => {
	// styling file image container
	return (
		<ToastProvider>
			<ComponentWithToasts />
		</ToastProvider>
	);
};

export default ArticleCreate;
