import React, { memo } from 'react';
import propTypes from 'prop-types';
import { Image } from 'components/common';
import { InputDiv } from './Style';

export const Input = React.forwardRef(
	(
		{
			type,
			placeholder,
			name,
			onChange,
			value,
			onBlur = () => {},
			onFocus = () => {},
			className,
			error,
			readOnly,
			icon,
			errorClassName = '',
			...props
		},
		ref
	) => (
		<>
			<InputDiv isError={error}>
				<div className='icon'>
					<Image url={icon} align='absmiddle' width='' height='35px' />
				</div>

				<div className='vl' />
				<input
					readOnly={readOnly}
					type={type}
					placeholder={placeholder}
					name={name}
					className={`${className} ${error ? 'error' : ''}`}
					value={value}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					{...props}
					ref={ref}
				/>
			</InputDiv>
			{error && (
				<div className={`invalid-feedback d-block ${errorClassName}`}>
					{error}
				</div>
			)}
		</>
	)
);

Input.propTypes = {
	type: propTypes.string,
	placeholder: propTypes.string,
	name: propTypes.string,
	variant: propTypes.string,
	onChange: propTypes.func,
	selectedValue: propTypes.string,
	onBlur: propTypes.func,
	onFocus: propTypes.func,
	className: propTypes.string,
	readOnly: propTypes.bool,
	min: propTypes.any,
};

Input.defaultProps = {
	type: 'text',
	placeholder: 'text',
	name: 'name',
	classes: {},
	onChange: () => null,
	value: '',
	onBlur: () => null,
	onFocus: () => null,
	className: '',
	readOnly: false,
};

export default memo(Input);
