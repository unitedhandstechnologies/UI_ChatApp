import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';
import PerviewImage from 'components/PerviewImage';
import { Colxx } from 'components/common/CustomBootstrap';
import thumbImage from 'js-video-thumb-image';
import Loading from 'components/Loading';
import 'react-quill/dist/quill.snow.css';
import { getCategory } from 'Apis/admin';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { postTypes, mediaType } from 'views/Admin/Feeds/Constants';
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
const FeedForm = ({
	onSubmit,
	handleInput,
	isEdit = false,
	loading,
	feedForm,
}) => {
	const [viweImage, setViewImage] = useState(
		isEdit ? feedForm.video_thumb : ''
	);
	const [viweFeedImage, setViewFeedImage] = useState(
		isEdit ? feedForm.image : ''
	);
	const [categories, setCategories] = useState([]);
	const [loadings, setLoading] = useState(loading);
	useEffect(() => {
		setLoading(true);
		getCategory(1, 1000, '')
			.then((res) => {
				const { data } = res;
				const { result } = data.data;
				setLoading(false);
				setCategories(result);
			})
			.catch((err) => {
				setLoading(false);
				if (err.response) {
					const { data } = err.response;
					NotificationManager.warning(
						data.error_message,
						'Something went wrong',
						3000,
						null,
						null,
						''
					);
				}
			});
	}, []);
	const createThumb = async (event) => {
		if (parseInt(feedForm.postType) === 2) {
			const { File, error, imageUrl } = await thumbImage(
				event,
				'mythumbimage.png'
			);
			if (!error) {
				setViewImage(imageUrl);
				handleInput('video_thumb', File);
			}
		}
	};
	return (
		<>
			<Loading loading={loading || loadings} />
			<Form onSubmit={onSubmit}>
				<FormGroup row>
					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Title</Label>
							<Input
								type='text'
								required={true}
								value={feedForm.title}
								onChange={({ target }) => handleInput('title', target.value)}
								name='title'
								placeholder='Name'
							/>
						</FormGroup>
					</Colxx>

					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>category</Label>
							<select
								className='form-control'
								required
								disabled
								name='category_id'
								value={feedForm.category_id}
								onChange={({ target: { value } }) =>
									handleInput('category_id', value)
								}
							>
								<option value=''>Please Select Category</option>
								{categories.map((val) => (
									<option key={val.id} value={val.id}>
										{val.name}
									</option>
								))}
							</select>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Image</Label>
							<Input
								type='file'
								required={!isEdit}
								onChange={({ target }) => {
									handleInput('image', target.files[0]);
									setViewFeedImage(URL.createObjectURL(target.files[0]));
								}}
								accept='image/*'
								name='image'
								placeholder=''
								className='form-control'
							/>
						</FormGroup>
					</Colxx>

					<Colxx sm={6}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Image Preview</Label>

							<PerviewImage
								imageUrl={viweFeedImage}
								height='200px'
								className='form-control image-prv'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={6}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Post Type</Label>
							<select
								className='form-control'
								required
								name='postType'
								value={feedForm.postType}
								onChange={({ target: { value } }) =>
									handleInput('postType', value)
								}
							>
								<option value=''>Please Select PostType</option>
								{postTypes.map((val) => (
									<option key={val.value} value={val.value}>
										{val.name}
									</option>
								))}
							</select>
						</FormGroup>
					</Colxx>

					<Colxx sm={6}>
						<FormGroup>
							<Label for='examplePasswordGrid'>Media</Label>
							<Input
								disabled={feedForm.postType === ''}
								type='file'
								required={!isEdit}
								onChange={({ target }) => {
									handleInput('media', target.files[0]);
									createThumb(target.files[0]);
								}}
								accept={mediaType[parseInt(feedForm.postType)]}
								name='image'
								placeholder=''
								className='form-control'
							/>
						</FormGroup>
					</Colxx>
					{parseInt(feedForm.postType) === 2 && viweImage && (
						<div>
							<Colxx sm={12}>
								<FormGroup>
									<Label for='exampleEmailGrid'>Video Thumb</Label>
								</FormGroup>
							</Colxx>

							<Colxx sm={6}>
								<FormGroup>
									<PerviewImage imageUrl={viweImage} />
								</FormGroup>
							</Colxx>
						</div>
					)}

					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Description</Label>
							<ReactQuill
								toolbar={quillModules}
								value={feedForm.description}
								onChange={(value) => handleInput('description', value)}
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
FeedForm.prototype = {
	onSubmit: propTypes.func.isRequired,
	CategoryForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
};
export default FeedForm;
