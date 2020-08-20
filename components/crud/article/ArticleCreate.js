import React from 'react';
import Dante from 'Dante2';

const ArticleCreate = () => {
	return (
		<div className={`container`}>
			<Dante
				onChange={(editor) => {
					console.log('editor content: ', editor.emitSerializedOutput());
				}}
			/>
		</div>
	);
};

export default ArticleCreate;
