import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Form,
	Input,
	Label,
} from 'reactstrap';
const EditPackage = ({
	showModel,
	onClose,
	packagePrice = '10',
	packageName = 'name',
	onUpdate = () => {},
	currency = '',
}) => {
	const [price, setPrice] = useState(packagePrice);
	const hanldeSubmit = () => {
		onUpdate(price);
	};
	return (
		<Modal isOpen={showModel} size='lg' toggle={() => onClose(false)}>
			<ModalHeader toggle={() => onClose(false)}>{packageName}</ModalHeader>
			<ModalBody>
				<Form onSubmit={hanldeSubmit}>
					<Label>Price ({currency})</Label>
					<Input
						value={price}
						onChange={({ target: { value } }) => setPrice(value)}
						required
						type='number'
					/>
					<Button className='mt-4 btn-lg btn-info' type='submit'>
						{' '}
						Update{' '}
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
};
EditPackage.propTypes = {
	showModel: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
};

export default memo(EditPackage);
