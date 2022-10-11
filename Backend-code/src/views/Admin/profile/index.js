import React, { Fragment, useState, useReducer } from 'react';
import {
	Row,
	Card,
	CardBody,
	Nav,
	NavItem,
	TabPane,
	CardTitle,
	Input,
	FormGroup,
	Label,
	Button,
	Form,
} from 'reactstrap';
import { updateProfile } from 'Apis/admin';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import StatusUpdate from 'components/UpdateStatus';
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import { NotificationManager } from 'components/common/react-notifications';
const Profile = () => {
	const userInfo = JSON.parse(localStorage.getItem('LoginUser'));
	const [PerviewImage, setPerviewImage] = useState(
		userInfo.profile || '/assets/img/logo.png'
	);
	const reducer = (form, action) => {
		switch (action.key) {
			case action.key:
				return { ...form, [action.key]: action.value };
			default:
				throw new Error('Unexpected action');
		}
	};
	userInfo.password = 'empty';
	userInfo.image = '';
	const [adminDetails, dispatch] = useReducer(reducer, userInfo);
	const [loading, setIsLoading] = useState(false);
	const handleInput = (key, value) => {
		dispatch({ key, value });
	};
	const updateAdmin = (e) => {
		e.preventDefault();
		setIsLoading(true);
		updateProfile(adminDetails)
			.then((res) => {
				const { data } = res;
				localStorage.setItem('LoginUser', JSON.stringify(data.data));
				NotificationManager.success(
					'Profile Updated successfully',
					'Success',
					3000,
					null,
					null,
					''
				);
				window.location.reload();
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
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<Fragment>
			<Row>
				<Colxx xxs='12'>
					<h1>Admin Profile</h1>
					<Nav tabs className='separator-tabs ml-0 mb-5'>
						<NavItem>
							<NavLink
								className={classnames({
									active: 1,
									'nav-link': true,
								})}
								location={{}}
								to='#'
							></NavLink>
						</NavItem>
					</Nav>

					<TabPane tabId='1'>
						<Row>
							<Colxx xxs='12' lg='4' className='mb-4 col-left'>
								<Card className='mb-4'>
									<div className='position-absolute card-top-buttons'></div>
									<SingleLightbox
										thumb={PerviewImage}
										large={PerviewImage}
										className='card-img-top'
									/>

									<CardBody>
										<p className='text-muted text-small mb-2'>
											{adminDetails.first_name} {adminDetails.last_name}
										</p>
										<p className='mb-3'>Admin Profile</p>
									</CardBody>
								</Card>

								<Card className='mb-4'>
									<CardBody>
										<CardTitle>Details</CardTitle>
										<div className='remove-last-border remove-last-margin remove-last-padding'>
											<div>
												<b> Name </b> : {adminDetails.first_name}{' '}
												{adminDetails.last_name}
											</div>
											<hr />
											<div>
												<b> Email </b> : {adminDetails.email}
											</div>
											<hr />

											<div>
												<b> Status </b> :{' '}
												<StatusUpdate
													table='users'
													onUpdate={(data) =>
														(adminDetails.status =
															adminDetails.status === 1 ? 0 : 1)
													}
													data={adminDetails}
												/>
											</div>
											<hr />
										</div>
									</CardBody>
								</Card>
							</Colxx>
							<Colxx xxs='12' lg='8' className='mb-4 col-right'>
								<Row>
									{
										<Colxx xxs='12' lg='12' xl='12' className='mb-12'>
											<Card>
												<CardBody>
													<CardTitle>Edit Profile</CardTitle>
													<Row className='mb-4'>
														<Colxx xxs='12'>
															<Card>
																<CardBody>
																	<CardTitle>Admin Details</CardTitle>
																	<Form
																		onSubmit={updateAdmin}
																		autoComplete='off'
																	>
																		<FormGroup row>
																			<Colxx sm={6}>
																				<FormGroup>
																					<Label for='exampleEmailGrid'>
																						First Name
																					</Label>
																					<Input
																						type='text'
																						required={true}
																						value={adminDetails.first_name}
																						onChange={({ target }) => {
																							handleInput(
																								'first_name',
																								target.value
																							);
																						}}
																						name='first_name'
																						placeholder='first_name'
																					/>
																				</FormGroup>
																			</Colxx>

																			<Colxx sm={6}>
																				<FormGroup>
																					<Label for='examplePasswordGrid'>
																						Last Name
																					</Label>
																					<Input
																						type='text'
																						required={true}
																						value={adminDetails.last_name}
																						onChange={({ target }) =>
																							handleInput(
																								'last_name',
																								target.value
																							)
																						}
																						name='last_name'
																						placeholder='Last Name'
																					/>
																				</FormGroup>
																			</Colxx>

																			<Colxx sm={6}>
																				<FormGroup>
																					<Label for='exampleEmailGrid'>
																						Password
																					</Label>
																					<Input
																						type='password'
																						value={adminDetails.password}
																						onChange={({ target }) =>
																							handleInput(
																								'password',
																								target.value
																							)
																						}
																						name='password'
																						placeholder='Password'
																					/>
																				</FormGroup>
																			</Colxx>

																			<Colxx sm={6}>
																				<FormGroup>
																					<Label for='examplePasswordGrid'>
																						Email
																					</Label>
																					<Input
																						type='email'
																						required={true}
																						value={adminDetails.email}
																						onChange={({ target }) =>
																							handleInput('email', target.value)
																						}
																						name='email'
																						placeholder='Email'
																					/>
																				</FormGroup>
																			</Colxx>

																			<Colxx sm={12}>
																				<FormGroup>
																					<Label for='exampleEmailGrid'>
																						Profile
																					</Label>
																					<Input
																						type='file'
																						onChange={({ target }) => {
																							handleInput(
																								'image',
																								target.files[0]
																							);
																							setPerviewImage(
																								URL.createObjectURL(
																									target.files[0]
																								)
																							);
																						}}
																						placeholder='Profile'
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
																			Update Profile
																		</Button>
																	</Form>
																</CardBody>
															</Card>
														</Colxx>
													</Row>
												</CardBody>
											</Card>
										</Colxx>
									}
								</Row>
							</Colxx>
						</Row>
					</TabPane>
				</Colxx>
			</Row>
		</Fragment>
	);
};

export default Profile;
