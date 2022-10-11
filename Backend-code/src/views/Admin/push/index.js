import React, { Fragment, useState, useReducer } from 'react';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {
	Row,
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	Label,
	Button,
	Form,
} from 'reactstrap';
import { sendPush } from '../../../Apis/admin';
import { initialState } from './constants';
import { NotificationManager } from '../../../components/common/react-notifications';

const Push = React.memo(() => {
	const reducer = (form, action) => {
		switch (action.key) {
			case action.key:
				return { ...form, [action.key]: action.value };
			default:
				throw new Error('Unexpected action');
		}
	};
	const [classForm, dispatch] = useReducer(reducer, initialState);
	const [loading, setIsLoading] = useState(false);
	const addclass = (event) => {
		event.preventDefault();
		setIsLoading(true);
		sendPush(classForm)
			.then(() => {
				NotificationManager.success(
					'Push Send Successfully',
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

	const handleInput = (key, value) => {
		dispatch({ key, value });
	};
	return (
		<Fragment>
			<Row>
				<Colxx xxs='12'>
					Send Push
					<Separator className='mb-5' />
				</Colxx>
			</Row>
			<Row className='mb-4'>
				<Colxx xxs='12'>
					<Card>
						<CardBody>
							<CardTitle>Send Push</CardTitle>
							<Form onSubmit={addclass}>
								<FormGroup row>
									<Colxx sm='12'>
										<Label>Select User Type</Label>
										<select
											value={classForm.userType}
											className='form-control'
											required
											onChange={({ target: { value } }) =>
												handleInput('userType', value)
											}
										>
											<option>--Please User Type--</option>
											<option value='0'>Users</option>
											<option value='1'>Provider</option>
										</select>
									</Colxx>
									<Colxx sm={12} className='mt-4'>
										<FormGroup>
											<Label>Description</Label>
											<textarea
												rows='4'
												cols='50'
												required={true}
												value={classForm.description}
												className='form-control'
												onChange={({ target }) =>
													handleInput('message', target.value)
												}
											/>
										</FormGroup>
									</Colxx>
								</FormGroup>

								<Button disabled={loading} type='submit' color='primary'>
									Send Push
								</Button>
							</Form>
						</CardBody>
					</Card>
				</Colxx>
			</Row>
		</Fragment>
	);
});

export default Push;
