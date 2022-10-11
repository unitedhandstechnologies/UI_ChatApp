import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';
import PerviewImage from 'components/PerviewImage';
import { Colxx } from 'components/common/CustomBootstrap';
import Loading from 'components/Loading';
import Select from 'components/Select';
import { getCategory } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
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
const AddSpaceForm = ({
	onSubmit,
	handleInput,
	isEdit = false,
	loading,
	SpaceForm,
}) => {
	return (
		<>
			<Loading loading={loading} />
			<Form onSubmit={onSubmit}>
				<FormGroup row>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Space Type</Label>
							<Input
								type='text'
								required={true}
								value={SpaceForm.space_type}
								onChange={({ target }) =>
									handleInput('space_type', target.value)
								}
								name='space_type'
								placeholder='Space Type'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Price</Label>
							<Input
								type='number'
								required={true}
								value={SpaceForm.price}
								onChange={({ target }) => handleInput('price', target.value)}
								name='price'
								placeholder='Price'
							/>
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
					{isEdit ? 'Update' : 'Save'}
				</Button>
			</Form>
		</>
	);
};
AddSpaceForm.prototype = {
	onSubmit: propTypes.func.isRequired,
	SpaceForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
};
export default AddSpaceForm;
