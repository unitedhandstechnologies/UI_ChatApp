import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';
import PerviewImage from 'components/PerviewImage';
import { Colxx } from 'components/common/CustomBootstrap';
import Loading from 'components/Loading';
import 'react-quill/dist/quill.snow.css';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
const quillModules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image'],
		['clean'],
	],
};
const AddCategory = ({
	onSubmit,
	handleInput,
	isEdit = false,
	loading,
	CategoryForm,
}) => {
	const [viweImage, setViewImage] = useState(isEdit ? CategoryForm.image : '');
	return (
		<>
			<Loading loading={loading} />
			<Form onSubmit={onSubmit}>
				<FormGroup row>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Service Name</Label>
							<Input
								type='text'
								required={true}
								value={CategoryForm.name}
								onChange={({ target }) => handleInput('name', target.value)}
								name='name'
								placeholder='Name'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Service Price</Label>
							<Input
								type='number'
								step='1'
								min='1'
								required={true}
								value={CategoryForm.price}
								onChange={({ target }) => handleInput('price', target.value)}
								name='price'
								placeholder='Price'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Profile</Label>
							<Input
								type='file'
								onChange={({ target }) => {
									handleInput('image', target.files[0]);
									setViewImage(URL.createObjectURL(target.files[0]));
								}}
								name='image'
								placeholder=''
								className='form-control'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<PerviewImage imageUrl={viweImage} />
					</Colxx>
					{/* <Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Description</Label>
							<ReactQuill
								toolbar={quillModules}
								value={CategoryForm.description}
								onChange={(value) => handleInput('description', value)}
							/>
						</FormGroup>
					</Colxx> */}
				</FormGroup>

				<Button
					disabled={loading}
					type='submit'
					className={`btn-shadow btn-multiple-state ${
						loading ? 'show-spinner' : ''
					}`}
					color='primary'
				>
					{isEdit ? 'Update' : 'Save'}
				</Button>
			</Form>
		</>
	);
};
AddCategory.prototype = {
	onSubmit: propTypes.func.isRequired,
	CategoryForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
};
export default AddCategory;
