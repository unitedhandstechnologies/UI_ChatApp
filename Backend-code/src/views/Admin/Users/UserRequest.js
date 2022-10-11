import React, { Fragment, useState, useEffect, useCallback } from 'react';
import ListPageHeading from 'containers/pages/ListPageHeading';
import Pagination from 'containers/pages/Pagination';
import Actions from 'components/Actions';
import ImagePreView from 'components/PerviewImage/ModalView';
import { getrequest } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
import { Link } from 'react-router-dom';
import StatusUpdate from 'components/UpdateStatus';
import { convertDate } from 'constants/defaultValues';
import { additional } from './Constants';
const UserRequest = React.memo(({ match, history }) => {
	const [pageInfo, setPageInfo] = useState(additional);
	const [totalRequest, setTotalRequest] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPageSize, setSelectedPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchtext] = useState(undefined);
	const [viewImage, setViewImage] = useState(false);
	const [imagePath, setImagePath] = useState('');
	useEffect(() => {
		getrequest(currentPage, selectedPageSize, searchText)
			.then((res) => {
				const { data } = res;
				const { result, pagination } = data.data;
				setIsLoading(false);
				setTotalRequest(result);
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
	}, [selectedPageSize, currentPage, searchText]);
	const onSearchKey = (event) => {
		setSearchtext(event.target.value);
	};
	const changePageSize = (value) => {
		setIsLoading(true);
		setSelectedPageSize(value);
	};
	const onChangePage = (value) => {
		setCurrentPage(value);
	};
	const DeleteDataLocal = useCallback(
		(key) => {
			totalRequest.splice(key, 1);
			setTotalRequest([...totalRequest]);
		},
		[setTotalRequest]
	);
	const updateLocal = useCallback(
		(value, key) => {
			totalRequest[key] = value;
			setTotalRequest([...totalRequest]);
		},
		[setTotalRequest]
	);
	const startIndex = (currentPage - 1) * selectedPageSize;
	const endIndex = currentPage * selectedPageSize;
	return isLoading ? (
		<div className='loading' />
	) : (
		<Fragment>
			<ListPageHeading
				match={match}
				heading='Renter Requests'
				changePageSize={changePageSize}
				selectedPageSize={selectedPageSize}
				totalItemCount={pageInfo.totalItemCount}
				startIndex={startIndex}
				endIndex={endIndex}
				onSearchKey={onSearchKey}
				orderOptions={pageInfo.orderOptions}
				pageSizes={pageInfo.pageSizes}
			/>
			<table className='table table-striped animate__animated  animate__zoomIn'>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Image</th>
						<th>Request Status</th>
						<th>Request Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{totalRequest.map((request, key) => (
						<React.Fragment key={request.id}>
							<tr>
								<td>{key + 1}</td>
								<td>
									<Link
										to={{
											pathname: '/request-details',
											state: { request },
										}}
										className='d-flex'
									>
										{' '}
										{request.first_name} {request.last_name}
									</Link>
								</td>
								<td>
									<img
										onClick={() => {
											setImagePath(request.image || '/assets/img/logo.png');
											setViewImage(true);
										}}
										alt={request.first_name}
										src={request.image || '/assets/img/logo.png'}
										className='list-thumbnail responsive border-0 card-img-left'
									/>
								</td>
								<td>
									<StatusUpdate
										table='user_requests'
										statusMessage={{
											0: 'Rejected',
											1: 'Approved',
										}}
										onUpdate={(data) => updateLocal(data, key)}
										data={request}
									/>
								</td>
								<td>{convertDate(request.created)}</td>
								<td>
									<Actions
										key={key}
										isView={true}
										isEdit={false}
										table='user_requests'
										view='request'
										onDelete={DeleteDataLocal}
										data={request}
										viewPath='/request-details'
										name='request'
									/>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
			<ImagePreView
				name='User Pic'
				imagePath={imagePath}
				showModel={viewImage}
				onClose={(value) => setViewImage(value)}
			/>
			<Pagination
				currentPage={currentPage}
				totalPage={pageInfo.totalPage}
				onChangePage={(i) => onChangePage(i)}
			/>
		</Fragment>
	);
});

export default UserRequest;
