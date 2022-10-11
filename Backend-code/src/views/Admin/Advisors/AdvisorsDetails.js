import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import Avatar from 'react-avatar';
import StatusUpdate from 'components/UpdateStatus';
import ReactLoading from 'components/Loading';
const AdvisorDetails = (props) => {
	const [userDetails, setUserDetails] = useState({
		...props.location.state.post,
	});
	return (
		<Fragment>
			<h1 style={{ paddingTop: '31px' }}> Advisor Details </h1>
			<hr className='mb-4 mt-1' />
			<Card className='color-white'>
				<CardBody className='color-white details-data mb-2'>
					<div className='name mb-4'>
						<b> Profile Photo : </b>{' '}
						<Avatar
							round='10px'
							name={userDetails.name}
							size='50'
							textSizeRatio={1}
							color='#485256'
						/>
					</div>
					<hr />
					<div className='name'>
						<b> Name: </b> {userDetails.name}
					</div>
					<hr />
					<div className='name'>
						<b> Email: </b> {userDetails.email}
					</div>
					<hr />
					<div className='name'>
						<b> Specialization: </b>{' '}
						{userDetails.specialization.map(({ name, id }) => (
							<span
								role='button'
								tabIndex='1'
								key={id}
								className={'click speciality-cat active'}
							>
								{name}
							</span>
						))}
					</div>
					<hr />
					<div className='name'>
						<b> Advisor Status:- </b> &nbsp;
						<StatusUpdate
							statusMessage={{
								0: 'Inactive',
								1: 'Active',
							}}
							table='users'
							onUpdate={(data) => setUserDetails({ ...userDetails, ...data })}
							data={userDetails}
							updateKey='status'
							isButton
						/>
					</div>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default AdvisorDetails;
