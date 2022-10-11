import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Colxx } from 'components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import PerviewImage from 'components/PerviewImage';
const AddGroupFORM = ({ onSubmit, handleInput, loading, userForm }) => {
	const [viweImage, setViewImage] = useState('');
	return (
		<>
			<Form onSubmit={onSubmit}>
				<FormGroup row>
					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Name</Label>
							<Input
								type='text'
								required={true}
								value={userForm.name}
								onChange={({ target }) => handleInput('name', target.value)}
								name='name'
								placeholder='Name'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={12}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Description</Label>
							<Input
								type='teaxtarea'
								onChange={({ target: { value } }) =>
									handleInput('descriptions', value)
								}
								value={userForm.descriptions}
								name='descriptions'
								placeholder='Description'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Group Image</Label>
							<Input
								type='file'
								onChange={({ target }) => {
									handleInput('profile', target.files[0]);
									setViewImage(URL.createObjectURL(target.files[0]));
								}}
								name='profile'
								placeholder=''
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Perview Image</Label>
							<PerviewImage imageUrl={viweImage} />
						</FormGroup>
					</Colxx>
				</FormGroup>

				<Button
					disabled={loading}
					type='submit'
					className={`btn-shadow btn-multiple-state ${
						loading ? 'show-spinner' : ''
					}`}
					color='primary'
				>
					Save
				</Button>
			</Form>
		</>
	);
};
AddGroupFORM.prototype = {
	onSubmit: propTypes.func.isRequired,
	userForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
};
export default AddGroupFORM;
