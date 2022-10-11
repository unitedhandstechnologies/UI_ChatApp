import React, { Fragment, useState, useReducer, useCallback } from 'react';
import swal from 'sweetalert';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Row, Card, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { editAdvisorsData } from 'Apis/admin';
import UserForm from 'containers/Users';
import Loading from 'components/Loading';
import { NotificationManager } from 'components/common/react-notifications';
import {
	validateEmail,
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
} from 'utils/FormValidation';
import { editState } from './constants';
const EditAdvisor = React.memo((props) => {
	const reducer = (form, action) => {
		switch (action.key) {
			case action.key:
				return { ...form, [action.key]: action.value };
			default:
				throw new Error('Unexpected action');
		}
	};
	const editUser = {
		...props.location.state.post,
		specialties: props.location.state.post.specialization.map((val) => val.id),
	};
	delete editUser.password;
	const [userForm, dispatch] = useReducer(reducer, editUser);
	const [loading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [formError, setFormError] = useState(editState);
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(editState, userForm);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const addUserForm = (event) => {
		event.preventDefault();
		if (checkAllField()) {
			return false;
		}
		setIsLoading(true);
		const formData = { ...userForm };
		if (formData.specialties.length === 0) {
			swal(`You have'nt selected any specialties`, {
				icon: 'error',
			});
			return;
		}
		setIsLoading(true);
		formData.specialties = formData.specialties.join(',');
		editAdvisorsData(formData)
			.then(() => {
				setRedirect(true);
				NotificationManager.success(
					'Advisor Edit successfully',
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
					<h1>Edit Provider ({userForm.name})</h1>
					<Separator className='mb-5' />
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
								isEdit
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

export default EditAdvisor;
