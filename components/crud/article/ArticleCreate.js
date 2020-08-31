import { useState, useEffect } from 'react';
import Dante from 'Dante2';
import { useForm } from 'react-hook-form';
import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image.js';
import { VideoBlockConfig } from 'Dante2/package/lib/components/blocks/video.js';
import { useDropzone } from 'react-dropzone';

import Loading from '../../spinner/Loading';
import { getCategoriees } from '../../../actions/category';
import styles from './ArticleCreate.module.css';

const ArticleCreate = () => {
	// styling file image container
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

	const { register, handleSubmit, errors } = useForm(); // initialise the hook

	const [categories, setCategories] = useState([]);
	const [checkedCat, setCheckedCat] = useState([]);

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
									// value={title}
									// onChange={handleChange('title')}
									ref={register({ required: true })}
									autoComplete="off"
									style={errors.title && { border: '1px solid red' }}
								/>
								<p className="small text-muted">Cannot change later</p>
								<p className={`text-danger`} style={{ fontSize: '0.8rem' }}>
									{errors.title && 'Blog should have a title'}
								</p>
							</div>

							<div className="form-group">
								<label className="col-form-label">
									<h4>Upload Featured Image</h4>
								</label>
								<Previews />
							</div>

							<Dante
								content={null}
								onChange={(editor) => {
									// console.log(editor);
									console.log('editor content: ', editor.emitSerializedOutput());
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
				</div>
			</React.Fragment>
		);
	};

	return (
		<div className={`${styles.heightedcontainer}`}>
			<div className={`container `}>{creationArticleArea()}</div>
		</div>
	);
};

export default ArticleCreate;
