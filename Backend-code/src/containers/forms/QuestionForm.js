import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Colxx } from 'components/common/CustomBootstrap';
import Loading from 'components/Loading';
import { getQCategory } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
const QuestionForm = ({
	onSubmit,
	handleInput,
	isEdit = false,
	loadings,
	questionForm,
	options,
	handleOption,
	addOption,
}) => {
	const [questionCategories, setQuestionCategories] = useState([]);
	const [loading, setLoading] = useState(loadings);
	useEffect(() => {
		setLoading(true);
		getQCategory(1, 1000, '')
			.then((res) => {
				const { data } = res;
				const { result } = data.data;
				setLoading(false);
				setQuestionCategories(result);
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
	return (
		<>
			<Loading loading={loadings || loading} />
			<Form onSubmit={onSubmit}>
				<FormGroup row>
					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Question ?</Label>
							<Input
								type='text'
								required={true}
								value={questionForm.question}
								onChange={({ target: { value } }) =>
									handleInput('question', value)
								}
								name='question'
								placeholder='Write a Question ?'
							/>
						</FormGroup>
					</Colxx>
					<Colxx sm={12}>
						<FormGroup>
							<Label for='exampleEmailGrid'>Question Categories</Label>
							<select
								className='form-control'
								required
								name='question_category_id'
								value={questionForm.question_category_id}
								onChange={({ target: { value } }) =>
									handleInput('question_category_id', value)
								}
							>
								<option value=''>Please Select Category</option>
								{questionCategories.map((val) => (
									<option key={val.id} value={val.id}>
										{val.name}
									</option>
								))}
							</select>
						</FormGroup>
					</Colxx>
					<Colxx sm={12}>
						<hr />
						<h3 className='answer'>{isEdit ? 'Edit Option' : 'Add  Option'}</h3>
						<hr />
					</Colxx>
					{options.map((val, key) => (
						<>
							<Colxx sm={8}>
								<FormGroup>
									<Label for='exampleEmailGrid'>Option {key + 1}</Label>
									<Input
										required
										placeholder={`Option ${key + 1}`}
										name={val.name}
										value={val.value}
										onChange={({ target: { value, name } }) =>
											handleOption({ key, value, name: 'value' })
										}
									/>
								</FormGroup>
							</Colxx>
							<Colxx sm={key >= 2 ? 2 : 4}>
								<FormGroup>
									<Label for='exampleEmailGrid'>Score</Label>
									<Input
										required
										placeholder='Score'
										name='score'
										value={val.score}
										onChange={({ target: { value, name } }) =>
											handleOption({ key, value, name })
										}
									/>
								</FormGroup>
							</Colxx>

							{key >= 2 && (
								<Colxx sm={2}>
									<div
										className='simple-icon-minus remove-icon'
										onClick={() => addOption(false, key)}
									>
										<span>Remove</span>
									</div>
								</Colxx>
							)}
						</>
					))}
					<Colxx sm={12}>
						<hr />
					</Colxx>
					<Colxx sm={6}></Colxx>
					<Colxx sm={6} className='flex-game'>
						<Button
							onClick={addOption}
							className='btn btn-info btn-new btn-shadow btn-multiple-state'
						>
							{' '}
							+ Add More options
						</Button>
					</Colxx>
				</FormGroup>

				<Button
					disabled={loading}
					type='submit'
					className={`mb-2 btn btn-primary btn-lg  ${
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
QuestionForm.prototype = {
	onSubmit: propTypes.func.isRequired,
	SpaceForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
	addOption: propTypes.func,
};
export default QuestionForm;
