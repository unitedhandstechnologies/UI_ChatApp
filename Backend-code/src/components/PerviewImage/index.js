import React from 'react';
import propTypes from 'prop-types';
const PerviewImage = ({ imageUrl, className = '', height = 100 }) =>
	imageUrl && (
		<img
			src={imageUrl}
			alt='ima-name'
			className={className}
			height={height}
			width='100'
		/>
	);
PerviewImage.propTypes = {
	imageUrl: propTypes.string.isRequired,
};
export default PerviewImage;
