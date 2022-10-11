import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReactQuill from 'react-quill';
import PerviewImage from 'components/PerviewImage';
import thumbImage from 'js-video-thumb-image';
import { Colxx } from 'components/common/CustomBootstrap';
import Loading from 'components/Loading';
import 'react-quill/dist/quill.snow.css';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import { postTypes, mediaType } from 'views/Admin/UserFeeds/Constant';
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
		isEdit
			? feedForm.postType === 0
				? feedForm.media || ''
				: feedForm.video_thumb || ''
			: ''
	);
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
		} else if (parseInt(feedForm.postType) === 0) {
			setViewImage(URL.createObjectURL(event));
		}
	};
	return (
		<>
			<Loading loading={loading} />
			<Form onSubmit={onSubmit}>
				<FormGroup row>
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
					{viweImage && (
						<div>
							<Colxx sm={12}>
								<FormGroup>
									<Label for='exampleEmailGrid'>Image/Video Thumb</Label>
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
FeedForm.propTypes = {
	onSubmit: propTypes.func.isRequired,
	CategoryForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
};
export default FeedForm;
