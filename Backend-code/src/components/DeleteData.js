import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import swal from 'sweetalert';
import { deleteUser } from '../Apis/admin';
const DeleteData = ({
	classes,
	children,
	table,
	data,
	ondelete,
	view = 'User',
	isInput = false,
}) => {
	const deleted = () => {
		swal({
			title: `Are you sure you want to ${
				isInput ? 'Cancel' : 'Delete'
			} this ${view}?`,
			icon: 'warning',
			dangerMode: true,
			buttons: ['No', 'Yes'],
		}).then((willDelete) => {
			if (willDelete) {
				if (isInput) {
					swal({
						text: 'Please type cancel reason.',
						content: 'input',
						confirmButtonColor: '#ff5900',
						button: {
							text: 'Cancel',
							closeModal: false,
							classes: 'swal-button',
						},
					})
						.then((name) => {
							if (!name) throw null;
							deleteUser({ table: table, id: data, message: name })
								.then((data) => {
									ondelete(data);
									swal(view + ' have been deleted', {
										icon: 'success',
									});
								})
								.catch((err) => {
									swal('Something went wrong', {
										icon: 'error',
									});
								})
								.finally(() => {
									swal.stopLoading();
								});
						})
						.catch(() => {
							swal.stopLoading();
							swal.close();
						});
					return;
				}
				deleteUser({ table: table, id: data })
					.then((data) => {
						swal(view + ' have been deleted', {
							icon: 'success',
						});
						ondelete(data);
					})
					.catch((err) => {
						swal('Something went wrong', {
							icon: 'error',
						});
					});
			} else {
				swal('Process Cancel');
			}
		});
	};

	return <Button className={classes} children={children} onClick={deleted} />;
};

DeleteData.propTypes = {
	children: PropTypes.node.isRequired,
	table: PropTypes.string.isRequired,
	data: PropTypes.number.isRequired,
};

DeleteData.defaultProps = {
	type: 'button',
	disabled: null,
	classes: 'mb-2 btn btn-danger',
};

export default DeleteData;
