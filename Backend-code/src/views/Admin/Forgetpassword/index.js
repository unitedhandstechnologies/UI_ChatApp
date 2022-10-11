import React, { useState, Suspense } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Redirect, NavLink } from 'react-router-dom';
import { NotificationManager } from 'components/common/react-notifications';
import { Input } from 'components/common';
import { Adminlogin } from 'Apis/admin';
import { Colxx } from 'components/common/CustomBootstrap';
import UserLayout from 'layout/UserLayout';
import { checkAuth } from 'utils/helper';
import {
	validateEmail,
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
} from 'utils/FormValidation';
const ForgetPassword = React.memo(({ props }) => {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(checkAuth('LoginUser'));
	const [userInfo, SetUserinfo] = useState({ email: '' });
	const [formError, setFormError] = useState({ email: '' });
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey({ email: '' }, userInfo);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const onUserSignup = (event) => {
		event.preventDefault();
		if (checkAllField()) {
			return false;
		}
		setLoading(true);
		const { email, password } = userInfo;
		Adminlogin({ email, password })
			.then(async (res) => {
				setRedirect(true);
				NotificationManager.success(
					'User Signup successfully',
					'Login Success',
					3000,
					null,
					null,
					''
				);
			})
			.catch((err) => {
				setLoading(false);
				if (err.response) {
					const { data } = err.response;
					NotificationManager.warning(
						data.error_message,
						'Error',
						3000,
						null,
						null,
						''
					);
				}
			});
	};
	const removeError = ({ target: { name } }) => {
		setFormError({ ...formError, [name]: '' });
	};
	const checkError = ({ target: { name, value } }) => {
		const errors = {};
		switch (name) {
			case 'email':
				Object.assign(errors, validateEmail(name, value));
				break;
			default:
				Object.assign(errors, checkRequiredField(name, value));
				break;
		}
		setFormError({ ...formError, ...errors });
	};
	const handleInput = ({ target: { name, value } }) => {
		SetUserinfo({ ...userInfo, [name]: value });
	};
	if (redirect) {
		return <Redirect to='/' />;
	}
	return (
		<UserLayout>
			<Suspense fallback={<div className='loading' />}>
				<Row className='h-100'>
					<Colxx xxs='12' md='10' className='mx-auto my-auto'>
						<Card className='auth-card'>
							<div className='position-relative image-side ' />
							<div className='form-side'>
								<NavLink to={`/`} className='white login-logo'>
									<img
										height='200px'
										className='pb-5'
										src='/assets/img/logo.png'
										alt='dd'
									/>
									{/* <span className="logo-single" /> */}
								</NavLink>
								<form
									onSubmit={onUserSignup}
									className='av-tooltip tooltip-label-bottom mt-2'
								>
									<FormGroup className='form-group forgot-password has-float-label'>
										<h3>Forgot Password?</h3>
										<h6>
											Provide your account's email for which you want to reset
											your password!
										</h6>
									</FormGroup>
									<FormGroup className='form-group has-float-label'>
										<Input
											placeholder='Email Address'
											name='email'
											type='email'
											value={userInfo.email}
											error={formError.email}
											onFocus={removeError}
											onBlur={checkError}
											onChange={handleInput}
											icon={require('images/emailIcon.png')}
										/>
									</FormGroup>

									<div className="'d-flex align-items-center mt-2">
										<Button
											color='primary'
											className={`btn-shadow w-100 btn-login mt-5 btn-multiple-state mr-2 ${
												loading ? 'show-spinner' : ''
											}`}
											size='lg'
										>
											<span className='spinner d-inline-block'>
												<span className='bounce1' />
												<span className='bounce2' />
												<span className='bounce3' />
											</span>
											<span className='label'>Continue</span>
										</Button>
									</div>
								</form>
							</div>
						</Card>
					</Colxx>
				</Row>
			</Suspense>
		</UserLayout>
	);
});

export default ForgetPassword;
