import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { packageList, updatePackagePrice } from 'Apis/admin';
import EditPackage from 'components/EditPackage';
import { NotificationManager } from 'components/common/react-notifications';
const AllPackages = React.memo(() => {
	const [plans, setPlans] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const [showEditPackage, setShowEditPackage] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState({});
	const handleEdit = (data, index) => {
		setShowEditPackage(true);
		setSelectedPackage({ ...data, index });
	};
	const onSubmit = (price) => {
		setShowEditPackage(false);
		setIsLoading(true);
		updatePackagePrice({ priceId: selectedPackage.priceId, price })
			.then(() => {
				const allPlans = [...plans];
				allPlans[selectedPackage.index].priceInfo.unit_amount = price;
				setPlans(allPlans);
				setSelectedPackage({});
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
		packageList()
			.then(({ data }) => {
				setPlans(data.data.data);
				setIsLoading(false);
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
	}, []);

	return loading ? (
		<div className='loading' />
	) : (
		<Fragment>
			<Card>
				<CardBody>
					<h4>All Packages</h4>
				</CardBody>
			</Card>
			<table className='table table-striped animate__animated  animate__zoomIn animate__fadeInDown'>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Currency</th>
						<th>Live Mode</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{plans.map((plan, key) => (
						<React.Fragment key={key}>
							<tr>
								<td>{key + 1}</td>
								<td>{plan.name}</td>
								<td>{plan.priceInfo.unit_amount / 100}</td>
								<td>{plan.priceInfo.currency}</td>
								<td>
									<span
										className={`badge badge-pill ${
											plan.livemode ? 'badge-success' : 'badge-danger'
										}`}
									>
										{plan.livemode ? 'Yes' : 'No'}
									</span>
								</td>
								<td>
									<button
										onClick={() => handleEdit(plan, key)}
										className='btn btn-primary'
									>
										Edit Price
									</button>
								</td>
							</tr>
						</React.Fragment>
					))}
					{!loading && plans.length === 0 && (
						<tr className='no-record-tr'>
							<td colSpan='6'>
								<h2 className='no-record'>No record Found</h2>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{showEditPackage && (
				<EditPackage
					showModel={showEditPackage}
					onClose={() => {
						setShowEditPackage(false);
						setSelectedPackage({});
					}}
					onUpdate={onSubmit}
					packagePrice={selectedPackage.priceInfo.unit_amount}
					packageName={selectedPackage.name}
					currency={selectedPackage.priceInfo.currency}
				/>
			)}
		</Fragment>
	);
});

export default AllPackages;
