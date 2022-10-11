import React, { Fragment, useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import ListPageHeading from 'containers/pages/ListPageHeading';
import Pagination from 'containers/pages/Pagination';
import ImagePreView from 'components/PerviewImage/ModalView';
import StatusUpdate from 'components/UpdateStatus';
import { users } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
import { Link } from 'react-router-dom';
import ReactLoading from 'components/Loading';
import { convertDate } from 'constants/defaultValues';
const additional = {
	currentPage: 1,
	totalItemCount: 0,
	totalPage: 1,
	search: '',
	pageSizes: [10, 20, 50, 100],
};

const Users = React.memo((props) => {
	const [pageInfo, setPageInfo] = useState(additional);
	const [totalPosts, setTotalPost] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPageSize, setSelectedPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchtext] = useState(undefined);
	const [viewImage, setViewImage] = useState(false);
	const [imagePath] = useState('');
	const [loading] = useState(false);
	useEffect(() => {
		users(currentPage, selectedPageSize, searchText)
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
	const DeleteDataLocal = (key) => {
		totalPosts.splice(key, 1);
		setTotalPost([...totalPosts]);
	};
	const updateLocal = (value, key) => {
		totalPosts[key] = value;
		setTotalPost([...totalPosts]);
	};
	const startIndex = (currentPage - 1) * selectedPageSize;
	const endIndex = currentPage * selectedPageSize;
	return isLoading ? (
		<div className='loading' />
	) : (
		<Fragment>
			<ListPageHeading
				onClick={() => props.history.push('/add-user')}
				Addname='+ Add New User'
				match={props.match}
				heading='Users'
				changePageSize={changePageSize}
				selectedPageSize={selectedPageSize}
				totalItemCount={pageInfo.totalItemCount}
				startIndex={startIndex}
				endIndex={endIndex}
				onSearchKey={onSearchKey}
				orderOptions={pageInfo.orderOptions}
				pageSizes={pageInfo.pageSizes}
			/>
			<ReactLoading loading={loading} />
			<table className='table table-striped animate__animated h-100 animate__zoomIn animate__fadeInDown mb-5'>
				<thead>
					<tr className='text-black'>
						<th>#</th>
						<th>Profile</th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Created Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className='h-100'>
					{totalPosts.map((post, key) => (
						<tr key={key}>
							<td>{key + 1}</td>
							<td>
								<Avatar
									round='10px'
									name={post.name}
									size='50'
									textSizeRatio={1}
									color='#485256'
								/>
							</td>
							<td>{post.name}</td>
							<td>{post.email}</td>
							<td>
								<StatusUpdate
									data={post}
									table='users'
									statusMessage={{
										0: 'Inactive',
										1: 'Active',
									}}
									updateKey='status'
									onUpdate={() => updateLocal(key)}
								/>
							</td>
							<td>{convertDate(post.created)}</td>
							<td>
								<Link
									to={{
										pathname: '/user-details',
										state: { post },
									}}
									className='badge badge-pill badge-primary'
								>
									REFUND
								</Link>
							</td>
						</tr>
					))}
					{totalPosts.length === 0 && (
						<tr className='no-record-tr'>
							<td colSpan='7'>
								<h2 className='no-record'>No record Found</h2>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<ImagePreView
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

export default Users;
