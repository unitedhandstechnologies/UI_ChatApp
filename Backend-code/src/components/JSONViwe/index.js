import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	Form,
	Button,
	Label,
} from 'reactstrap';
const dropDownValues = [
	{
		name: 'Week Subscription',
		value: Math.round(new Date().getTime() / 1000, 0) + 60 * 60 * 24 * 7,
	},
	{
		name: 'Monthly Subscription',
		value: Math.round(new Date().getTime() / 1000, 0) + 60 * 60 * 24 * 30,
	},
];
const JSONView = ({ showModel, onClose, type, onSuccess }) => {
	const [value, setValue] = useState('');
	const handleSubmit = (event) => {
		event.preventDefault();
		onSuccess({ type, value });
	};
	return (
		<Modal isOpen={showModel} size='lg' toggle={() => onClose(false)}>
			<ModalHeader toggle={() => onClose(false)}>
				{type === 1 ? 'Add Free Subscription' : 'Add Points to User'}
			</ModalHeader>
			<ModalBody>
				<div className='mt-3 mb-3'>
					<Form onSubmit={handleSubmit}>
						<Label>{type === 1 ? 'Select Subscription' : 'Enter Points'}</Label>
						{type === 1 ? (
							<select
								className='form-control'
								required
								value={value}
								onChange={({ target: { value } }) => setValue(value)}
							>
								<option value=''>Select Subscription</option>
								{dropDownValues.map(({ name, value }) => (
									<option key={value} value={value}>
										{name}
									</option>
								))}
							</select>
						) : (
							<Input
								required
								type='number'
								min='1'
								placeholder='Add Points'
								onChange={({ target: { value } }) => {
									if (value < 0) return false;
									setValue(value);
								}}
							/>
						)}
						<Button type='submit' className='mt-4'>
							Save
						</Button>
					</Form>
				</div>
			</ModalBody>
		</Modal>
	);
};
JSONView.propTypes = {
	showModel: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	type: PropTypes.number.isRequired,
	onSuccess: PropTypes.func.isRequired,
};

export default JSONView;
