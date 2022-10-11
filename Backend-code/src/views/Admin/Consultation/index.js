import React, { Fragment, useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import ListPageHeading from 'containers/pages/ListPageHeading';
import Pagination from 'containers/pages/Pagination';
import { consultationData } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
import { convertDateTime } from 'constants/defaultValues';
import { timeConvert } from 'utils/helper';
import { additional, paymentType, bookingStatus } from './constants';
const Consultations = React.memo((props) => {
	const [pageInfo, setPageInfo] = useState(additional);
	const [totalBooking, setTotalPost] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPageSize, setSelectedPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		consultationData(
			currentPage,
			selectedPageSize,
			'',
			props.match?.params?.status || ''
		)
			.then((res) => {
				const { data } = res;
				const { result, pagination } = data.data;
				setIsLoading(false);
				setTotalPost(result);
				additional.totalItemCount = pagination.totalRecord;
				additional.selectedPageSize = pagination.limit;
				additional.totalPage = pagination.totalPage;
				setPageInfo({ ...additional });
			})
			.catch((err) => {
				setIsLoading(false);
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
	}, [selectedPageSize, currentPage]);
	const changePageSize = (value) => {
		setIsLoading(true);
		setSelectedPageSize(value);
	};
	const onChangePage = (value) => {
		setCurrentPage(value);
	};

	const startIndex = (currentPage - 1) * selectedPageSize;
	const endIndex = currentPage * selectedPageSize;
	return isLoading ? (
		<div className='loading' />
	) : (
		<Fragment>
			<ListPageHeading
				match={props.match}
				heading='Consultations'
				changePageSize={changePageSize}
				selectedPageSize={selectedPageSize}
				totalItemCount={pageInfo.totalItemCount}
				startIndex={startIndex}
				endIndex={endIndex}
				orderOptions={pageInfo.orderOptions}
				pageSizes={pageInfo.pageSizes}
				isSearch={false}
			/>
			<table className='table table-striped animate__animated mt-4  animate__zoomIn animate__fadeInDown'>
				<tbody>
					{totalBooking.map((Booking, key) => (
						<tr key={Booking.id} className='font-size-big'>
							<td>
								<div>
									<h2>Advisor</h2>
									<div className='d-flex'>
										<Avatar
											round='10px'
											name={
												Booking.advisorUserType === 0
													? Booking.userName
													: Booking.advisorName
											}
											size='50'
											textSizeRatio={1}
											color='#485256'
										/>
										<div className='d-flex flex-column ml-3'>
											<span>
												{Booking.advisorUserType === 0
													? Booking.userName
													: Booking.advisorName}
											</span>
											<span>
												{Booking.advisorUserType === 0
													? Booking.userEmail
													: Booking.advisorEmail}
											</span>
										</div>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2>User</h2>
									<div className='d-flex'>
										<Avatar
											round='10px'
											name={
												Booking.advisorUserType !== 0
													? Booking.userName
													: Booking.advisorName
											}
											size='50'
											textSizeRatio={1}
											color='#485256'
										/>
										<div className='d-flex flex-column ml-3'>
											<span>
												{Booking.advisorUserType !== 0
													? Booking.userName
													: Booking.advisorName}
											</span>
											<span>
												{Booking.advisorUserType !== 0
													? Booking.userEmail
													: Booking.advisorEmail}
											</span>
										</div>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2>Status</h2>
									<span
										className={`${
											Booking.isEnd === 1 ? 'inactive-chat' : 'active-chat'
										} `}
									>
										{Booking.isEnd === 1 ? 'Closed' : 'Active'}
									</span>
								</div>
							</td>
							<td>
								<div>
									<h2>Date</h2>
									<span>{convertDateTime(Booking.modified)}</span>
								</div>
							</td>
							<td>
								<div>
									<h2>Duration</h2>
									<span>{timeConvert(Booking.totalMins)}</span>
								</div>
							</td>
						</tr>
					))}
					{totalBooking.length === 0 && (
						<tr className=''>
							<td colSpan='5'>
								<h2 className='bg-red'>No record Found</h2>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination
				currentPage={currentPage}
				totalPage={pageInfo.totalPage}
				onChangePage={(i) => onChangePage(i)}
			/>
		</Fragment>
	);
});

export default Consultations;
