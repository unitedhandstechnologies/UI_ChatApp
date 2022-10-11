import React, { useState, Suspense } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Redirect, NavLink } from 'react-router-dom';
import { NotificationManager } from 'components/common/react-notifications';
import { Input } from 'components/common';
import { Adminlogin } from 'Apis/admin';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import UserLayout from 'layout/UserLayout';
import { localData, checkAuth } from 'utils/helper';
import {
	validateEmail,
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
} from 'utils/FormValidation';
const Login = React.memo(({ props }) => {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(checkAuth('LoginUser'));
	const [userInfo, SetUserinfo] = useState({
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({
		email: '',
		password: '',
	});
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(
			{ email: '', password: '' },
			userInfo
		);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const onUserLogin = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			const { email, password } = userInfo;
			Adminlogin({ email, password })
				.then(async (res) => {
					await localData('LoginUser', res.data.data);
					await localData('__theme_color', 'dark.orange');
					setRedirect(true);
					NotificationManager.success(
						'User Login successfully',
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
							'Login Error',
							3000,
							null,
							null,
							''
						);
					}
				});
		}
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
									onSubmit={onUserLogin}
									className='av-tooltip tooltip-label-bottom'
								>
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
									<FormGroup className='form-group has-float-label'>
										<Input
											placeholder='Password'
											type='password'
											name='password'
											value={userInfo.password}
											error={formError.password}
											onFocus={removeError}
											onBlur={checkError}
											onChange={handleInput}
											icon={require('images/eyeIcon.png')}
										/>
									</FormGroup>
									<div className='d-flex justify-content-between mb-3 text-black align-items-center'>
										<NavLink
											className='text-black f-size16'
											to={`/forgot-password`}
										>
											<IntlMessages
												className='text-black'
												id='user.forgot-password-question'
											/>
										</NavLink>
									</div>
									<div className="'d-flex align-items-center mt-2">
										<Button
											color='primary'
											className={`btn-shadow btn-login btn-multiple-state mr-2 ${
												loading ? 'show-spinner' : ''
											}`}
											size='lg'
										>
											<span className='spinner d-inline-block'>
												<span className='bounce1' />
												<span className='bounce2' />
												<span className='bounce3' />
											</span>
											<span className='label'>
												<IntlMessages id='user.login-button' />
											</span>
										</Button>
										<NavLink
											className='btn-shadow btn-multiple-state  btn btn-primary btn-lg btn-login btn-signup'
											to={`/signup`}
										>
											Sign Up
										</NavLink>
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

export default Login;
