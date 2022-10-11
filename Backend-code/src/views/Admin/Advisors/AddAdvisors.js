import React, { Fragment, useState, useReducer, useCallback } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Row, Card, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { addAdvisorInfo } from 'Apis/admin';
import UserForm from 'containers/Users';
import Loading from 'components/Loading';
import { NotificationManager } from 'components/common/react-notifications';
import {
	validateEmail,
	checkRequiredField,
	validatePassword,
	matchPassword,
	checkAllRequiredFieldsWithKey,
} from 'utils/FormValidation';
import { initialState } from './constants';

const AddAdvisor = React.memo(() => {
	const reducer = (form, action) => {
		switch (action.key) {
			case action.key:
				return { ...form, [action.key]: action.value };
			default:
				throw new Error('Unexpected action');
		}
	};
	const [userForm, dispatch] = useReducer(reducer, initialState);
	const [loading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [formError, setFormError] = useState(initialState);
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(initialState, userForm);
		Object.assign(
			errors,
			matchPassword(
				'confirmPassword',
				userForm.confirmPassword,
				userForm.password
			)
		);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const addUserForm = (event) => {
		event.preventDefault();
		if (checkAllField()) {
			return false;
		}
		const formData = { ...userForm };
		if (formData.specialties.length === 0) {
			swal(`You have'nt selected any specialties`, {
				icon: 'error',
			});
			return;
		}
		setIsLoading(true);
		formData.specialties = formData.specialties.join(',');
		addAdvisorInfo(formData)
			.then(() => {
				setRedirect(true);
				NotificationManager.success(
					'Advisor add successfully',
					'Success',
					3000,
					null,
					null,
					''
				);
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
	const removeError = useCallback(
		({ target: { name } }) => {
			setFormError((err) => ({ ...err, [name]: '' }));
		},
		[setFormError]
	);
	const checkError = useCallback(
		({ target: { name, value } }) => {
			const errors = {};
			switch (name) {
				case 'email':
					Object.assign(errors, validateEmail(name, value));
					break;
				case 'password':
					Object.assign(errors, validatePassword(name, value));
					break;
				case 'confirmPassword':
					Object.assign(errors, matchPassword(name, value, userForm.password));
					break;
				default:
					Object.assign(errors, checkRequiredField(name, value));
					break;
			}
			setFormError((err) => ({ ...err, ...errors }));
		},
		[setFormError, userForm.password]
	);

	const handleInput = useCallback(
		({ target: { name, value } }) => {
			dispatch({ key: name, value });
		},
		[dispatch]
	);
	const handleSpecialties = useCallback(
		(id) => {
			const copySpecialties = [...userForm.specialties];
			const index = copySpecialties.indexOf(id);
			if (index === -1) {
				copySpecialties.push(id);
			} else {
				copySpecialties.splice(index, 1);
			}
			dispatch({ key: 'specialties', value: copySpecialties });
		},
		[dispatch, userForm.specialties]
	);

	if (redirect) {
		return <Redirect to='/advisors' />;
	}
	return (
		<Fragment>
			<Row>
				<Colxx xxs='12'>
					<h1>Add Advisor</h1>
					<Separator className='mb-5 mt-3' />
				</Colxx>
			</Row>
			<Row className='mb-4'>
				<Colxx xxs='12'>
					<Card>
						<CardBody className='color-white'>
							<Loading loading={loading} />
							<UserForm
								onSubmit={addUserForm}
								loading={loading}
								userForm={userForm}
								handleInput={handleInput}
								formError={formError}
								onFocus={removeError}
								onBlur={checkError}
								addSpecialties={handleSpecialties}
							/>
						</CardBody>
					</Card>
				</Colxx>
			</Row>
		</Fragment>
	);
});

export default AddAdvisor;
