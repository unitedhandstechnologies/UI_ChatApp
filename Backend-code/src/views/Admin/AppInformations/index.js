import React, { Fragment, useState, useEffect } from 'react';
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
import { updateAppInfo, appInfo } from 'Apis/admin';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationManager } from 'components/common/react-notifications';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
const AppInformation = React.memo(() => {
	const [appInfor, setAppInfo] = useState([]);
	const [currentInfo, setCurrentInfo] = useState({});
	const [loading, setIsLoading] = useState(false);
	const [info, setInfo] = useState([]);
	const addclass = (event) => {
		event.preventDefault();
		setIsLoading(true);
		currentInfo.table = 'app_informations';
		updateAppInfo(currentInfo)
			.then(() => {
				NotificationManager.success(
					'Infotrmation Updated Successfully',
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
	useEffect(() => {
		setIsLoading(true);
		appInfo()
			.then((res) => {
				const { data } = res;
				setAppInfo(data.data);
				const infomations = [];
				data.data.forEach((value, key) => {
					const signle = {
						label: value.key_pair,
						value: value.id,
						key: value.key_pair,
					};
					infomations.push(signle);
				});
				setInfo(infomations);
				if (data.data.length > 0) {
					setCurrentInfo({ ...data.data[0] });
				}
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
	}, []);

	const handleInfo = (data) => {
		appInfor.forEach((value) => {
			if (value.id === data.value) {
				setCurrentInfo({ ...value });
			}
		});
	};
	return (
		<Fragment>
			<Row>
				<Colxx xxs='12'>
					<h1>App Contents</h1>
					<Separator className='mb-5' />
				</Colxx>
			</Row>
			<Row className='mb-4'>
				<Colxx xxs='12'>
					<Card>
						<CardBody>
							<CardTitle>App Contents</CardTitle>
							<Form onSubmit={addclass}>
								<FormGroup row>
									<Colxx sm={12}>
										<FormGroup>
											<Label>Name</Label>
											<Select
												//value= {currentInfo.id}

												components={{ Input: CustomSelectInput }}
												className='react-select'
												classNamePrefix='react-select'
												required
												name='form-field-name'
												onChange={(data) => handleInfo(data)}
												options={info}
											/>
										</FormGroup>
									</Colxx>
									<Colxx sm={12}>
										<FormGroup>
											<Label>Description</Label>
											<CKEditor
												editor={ClassicEditor}
												data={currentInfo.value}
												onInit={(editor) => {
													// You can store the "editor" and use when it is needed.
													console.log('Editor is ready to use!', editor);
												}}
												onChange={(event, editor) => {
													const data = editor.getData();
													currentInfo.value = data;
													//setCurrentInfo(currentInfo);
												}}
												onBlur={(event, editor) => {
													console.log('Blur.', editor);
												}}
												onFocus={(event, editor) => {
													console.log('Focus.', editor);
												}}
											/>
										</FormGroup>
									</Colxx>
								</FormGroup>

								<Button disabled={loading} type='submit' color='primary'>
									Update Infomations
								</Button>
							</Form>
						</CardBody>
					</Card>
				</Colxx>
			</Row>
		</Fragment>
	);
});

export default AppInformation;
