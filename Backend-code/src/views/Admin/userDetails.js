import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import StatusUpdate from 'components/UpdateStatus';
import ReactLoading from 'components/Loading';
import ImagePreView from 'components/PerviewImage/ModalView';
import { convertDate, convertDateTime } from 'constants/defaultValues';
import { getUserInfo } from 'Apis/admin';

const UserDetails = (props) => {
	const [userDetails, setUserDetails] = useState({
		...props.location.state.post,
	});
	const [userBookings, setUserBookings] = useState([]);
	const [viewImage, setViewImage] = useState(false);
	const [imagePath, setImagePath] = useState('');
	const [loading, setLoading] = useState(false);

	console.log(userDetails);
	useEffect(() => {
		if (userDetails.id) {
			setLoading(true);
			getUserInfo(userDetails.id)
				.then((res) => {
					const { data } = res;
					const { allBooking } = data.data;
					setUserBookings(allBooking);
					setLoading(false);
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
		}
	}, [userDetails.id]);

	return (
		<Fragment>
			<Card>
				<CardHeader>
					<h1 style={{ paddingTop: '31px' }}> User Details </h1>
				</CardHeader>
			</Card>
			<ReactLoading loading={loading} />
			<CardBody>
				<div>
					<b> Name </b> : {userDetails.name}
				</div>
				<hr />
				<div>
					<b> Email </b> : {userDetails.email}
				</div>
				<hr />
				<div>
					<b> Phone </b> : {userDetails.phone}
				</div>
				<hr />

				<div>
					<b> DOB </b> : {convertDate(userDetails.dob)}
				</div>
				<hr />

				<div>
					<b> Address </b> : {userDetails.address}
				</div>
				<hr />

				<div>
					<b> Profile </b> :{' '}
					<img
						onClick={() => {
							setImagePath(userDetails.profile);
							setViewImage(true);
						}}
						alt={userDetails.first_name}
						src={userDetails.profile}
						className='list-thumbnail responsive border-0 card-img-left'
					/>
				</div>
				<hr />
				<div>
					<b> Status </b> : - &nbsp;
					<StatusUpdate
						table='users'
						onUpdate={(data) => setUserDetails({ ...userDetails, ...data })}
						data={userDetails}
						updateKey='status'
						isButton
					/>
				</div>
			</CardBody>

			<hr className='pb-5' />
			<Card>
				<CardHeader>
					{' '}
					<h3 className='mt-3'>User Bookings</h3>
				</CardHeader>
			</Card>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>#</th>
						<th>Provider Name</th>
						<th>Provider Email</th>
						<th>Service Name</th>
						<th>Price</th>
						<th>Start/End Time</th>
						<th>Booking Date</th>
					</tr>
				</thead>
				<tbody>
					{userBookings.map((booking, key) => (
						<tr key={booking.id}>
							<td>{key + 1}</td>
							<td>{booking.providerName}</td>
							<td>{booking.providerEmail}</td>
							<td>{JSON.parse(booking.serviceDetails)?.name}</td>
							<td>{booking.totalPrice}</td>
							<td>
								{convertDateTime(booking.bookingStartTime)} /{' '}
								{convertDateTime(booking.bookingEndTime)}
							</td>
							<td>{convertDate(booking.bookingDate)}</td>
						</tr>
					))}
					{userBookings.length === 0 && (
						<tr className=''>
							<td colSpan='8'>
								<h2 className='bg-red'>No record Found</h2>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<hr className='pb-5' />
			<ImagePreView
				imagePath={imagePath}
				showModel={viewImage}
				onClose={(value) => setViewImage(value)}
			/>
		</Fragment>
	);
};

export default UserDetails;
