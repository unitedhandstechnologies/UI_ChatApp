import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
	url,
	height = '100',
	className = '',
	width = '50',
	alt = 'image',
	...props
}) => (
	<img
		src={url}
		height={height}
		className={className}
		width={width}
		alt={alt}
		{...props}
	/>
);

Image.propType = {
	url: PropTypes.string.isRequired,
	height: PropTypes.string,
	width: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.string,
};
export default Image;
