import React, { useReducer, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { addLocation } from '../../Apis/admin';
import Autocomplete from 'react-google-autocomplete';
const initialState = {
	location: '',
	latitude: 0,
	longitude: 0
};
const AddLocation = ({ modalOpen, toggleModal, onSucess }) => {
	const reducer = (form, action) => {
		switch (action.key) {
			case action.key:
				return { ...form, [action.key]: action.value };
			default:
				throw new Error('Unexpected action');
		}
	};
	const location = (place) => {
		dispatch({ key: 'location', value: place.formatted_address });
		setError(false);
	};
	const [ locationForm, dispatch ] = useReducer(reducer, initialState);
	const [ error, setError ] = useState(true);

	const addLocations = () => {
		if (!locationForm.location) return false;
		addLocation(locationForm)
			.then((res) => {
				const { data } = res.data;
				resetForm();
				onSucess({
					id: data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const resetForm = () => {
		Object.keys(initialState).forEach((key) => {
			dispatch({ key, value: initialState[key] });
		});
	};
	return (
		<Modal isOpen={modalOpen} toggle={toggleModal} wrapClassName="modal-right" backdrop="static">
			<ModalHeader toggle={toggleModal}>Location</ModalHeader>
			<ModalBody>
				<Label>Location</Label>
				<Autocomplete
					required={true}
					className="form-control"
					style={{ width: '100%' }}
					onPlaceSelected={(place) => {
						location(place);
					}}
				/>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" outline onClick={toggleModal}>
					Cancel
				</Button>
				<Button color="primary" disabled={error} onClick={addLocations}>
					Save
				</Button>{' '}
			</ModalFooter>
		</Modal>
	);
};

export default AddLocation;
