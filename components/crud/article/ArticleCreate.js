import { useState } from 'react';
import Dante from 'Dante2';
import { useForm } from 'react-hook-form';
import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image.js';
import { VideoBlockConfig } from 'Dante2/package/lib/components/blocks/video.js';

import Loading from '../../spinner/Loading';

const ArticleCreate = () => {
	const { register, handleSubmit, errors } = useForm(); // initialise the hook

	const [categories, setCategories] = useState([]);

	const creationArticleArea = () => {
		return (
			<React.Fragment>
				<div className={`px-5 mt-3`}>
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
						<p className={`text-danger`} style={{ fontSize: '0.8rem' }}>
							{errors.title && 'Blog should have a title'}
						</p>
					</div>
					<div className="form-group">
						<label htmlFor="title" className="col-form-label">
							<h4>Blog Categories</h4>
							<p className="small text-muted">Blog must belong to atleast one of the above categories</p>
						</label>
					</div>
					<Dante
						content={null}
						onChange={(editor) => {
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
			</React.Fragment>
		);
	};

	return (
		<div className={`container`}>
			<Loading />
			{creationArticleArea()}
		</div>
	);
};

export default ArticleCreate;
