import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import { Input } from 'components/common';
import { NotificationManager } from 'components/common/react-notifications';
import ReactLoading from 'components/Loading';
import { getSpecialties } from 'Apis/admin';

const UserForm = ({
	onSubmit,
	handleInput,
	isEdit = false,
	loading,
	userForm,
	formError = {},
	onFocus = () => {},
	onBlur = () => {},
	addSpecialties = () => {},
}) => {
	const [specialties, setSpecialties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getSpecialties()
			.then((res) => {
				const { data } = res;
				const { result } = data.data;
				setSpecialties(result);
				console.log(result);
			})
			.catch((err) => {
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
			})
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<>
			{isLoading && <ReactLoading loading={isLoading} />}
			<Form onSubmit={onSubmit} className='mt-4 form-advisor'>
				<div className='d-flex'>
					<div className='form-left'>
						<Input
							type='text'
							value={userForm.name}
							onChange={handleInput}
							onFocus={onFocus}
							onBlur={onBlur}
							error={formError.name}
							icon={require('images/userIcon.png')}
							name='name'
							placeholder='Full Name'
							errorClassName='form-error'
						/>

						<Input
							placeholder='Email Address'
							name='email'
							type='email'
							value={userForm.email}
							error={formError.email}
							onFocus={onFocus}
							onBlur={onBlur}
							onChange={handleInput}
							icon={require('images/emailIcon.png')}
							errorClassName='form-error'
						/>
						{!isEdit && (
							<>
								<Input
									placeholder='Password'
									type='password'
									name='password'
									value={userForm.password}
									error={formError.password}
									onFocus={onFocus}
									onBlur={onBlur}
									onChange={handleInput}
									icon={require('images/eyeIcon.png')}
									errorClassName='form-error'
								/>

								<Input
									placeholder='Confirm Password'
									type='password'
									name='confirmPassword'
									value={userForm.confirmPassword}
									error={formError.confirmPassword}
									onFocus={onFocus}
									onBlur={onBlur}
									onChange={handleInput}
									icon={require('images/eyeIcon.png')}
									errorClassName='form-error'
								/>
							</>
						)}
					</div>
					<div className='form-right position-relative'>
						<textarea
							className={`aboutUs ${formError.aboutUs ? 'error' : ''}`}
							placeholder='About the Advisor'
							name='aboutUs'
							value={userForm.aboutUs}
							error={formError.aboutUs}
							onFocus={onFocus}
							onBlur={onBlur}
							onChange={handleInput}
							errorClassName='form-error'
						/>
						{formError.aboutUs && (
							<div className='invalid-feedback d-block'>
								{formError.aboutUs}
							</div>
						)}
					</div>
				</div>
				<div className='speciality'>
					<h1>Select Speciality</h1>
					<div className='d-flex'>
						{specialties.map(({ name, id }, index) => (
							<span
								onClick={() => addSpecialties(id, index)}
								role='button'
								tabIndex='1'
								onKeyPress={() => addSpecialties(id, index)}
								key={id}
								className={`click speciality-cat ${
									userForm.specialties.indexOf(id) !== -1 ? 'active' : ''
								}`}
							>
								{name}
							</span>
						))}
					</div>
				</div>
				<Button
					disabled={loading}
					type='submit'
					className={`btn-shadow btn-multiple-state mt-4 bg-button ${
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
UserForm.prototype = {
	onSubmit: propTypes.func.isRequired,
	userForm: propTypes.object.isRequired,
	handleInput: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
	isEdit: propTypes.bool,
};
export default UserForm;
