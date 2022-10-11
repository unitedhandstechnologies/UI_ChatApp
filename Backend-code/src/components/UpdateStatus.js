import React from 'react';
import PropTypes from 'prop-types';
import { updateAllStatus } from 'Apis/admin';

const StatusUpdate = ({
	table,
	data,
	onUpdate,
	updateKey = 'status',
	statusMessage,
	isButton = false,
	isUpdate = false,
}) => {
	const statusCheck = (status) => {
		if (isButton) {
			return status >= 1 ? 'btn btn-sm btn-success' : 'btn btn-sm btn-danger';
		}
		return status >= 1
			? 'badge badge-pill badge-success'
			: 'badge badge-pill badge-danger';
	};
	const text = (status) => {
		return parseInt(status) >= 4 ? statusMessage[3] : statusMessage[status];
	};

	const updateStatus = () => {
		if (parseInt(data[updateKey]) >= 1) {
			data[updateKey] = 0;
		} else {
			data[updateKey] = 1;
		}
		updateAllStatus({ table, [updateKey]: data[updateKey], id: data.id })
			.then((info) => {
				onUpdate(data);
			})
			.catch((err) => {});
	};

	return (
		<span
			style={{
				cursor: isUpdate ? 'none' : 'pointer',
				pointerEvents: isUpdate ? 'none' : 'click',
			}}
			onClick={updateStatus}
			className={statusCheck(data[updateKey])}
		>
			{text(data[updateKey])}
		</span>
	);
};

StatusUpdate.propTypes = {
	table: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	statusMessage: PropTypes.object,
};

StatusUpdate.defaultProps = {
	type: 'button',
	disabled: null,
	classes: 'badge badge-success',
	statusMessage: {
		1: 'Active',
		0: 'Deactive',
	},
};

export default StatusUpdate;
