import React from 'react';
import propTypes from 'prop-types';
export const Select = React.forwardRef(
	({ options, name, onChange, selected, onBlur, onFocus, required }, ref) => (
		<React.Fragment>
			<select
				required={required}
				style={{ height: '45px' }}
				name={name}
				defaultValue={selected}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				ref={ref}
				className='form-control'
			>
				<option value=''>--Please select--</option>
				{options.map((value, key) => {
					return (
						<option
							selected={value.key === selected}
							value={value.key}
							key={key}
						>
							{value.name}
						</option>
					);
				})}
			</select>
		</React.Fragment>
	)
);

Select.propTypes = {
	type: propTypes.string,
	selected: propTypes.string,
	name: propTypes.string,
	options: propTypes.array,
	onChange: propTypes.func,
	selectedValue: propTypes.string,
	onBlur: propTypes.func,
	onFocus: propTypes.func,
};

Select.defaultProps = {
	selected: null,
	options: [],
	name: 'name',
	onChange: () => null,
	onBlur: () => null,
	onFocus: () => null,
};

export default React.memo(Select);
