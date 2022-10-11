import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteData from 'components/DeleteData';

const Actions = ({
	key,
	view,
	table,
	isView,
	viewPath,
	data,
	onDelete,
	isEdit,
	editPath,
	name,
}) => {
	return (
		<>
			{isView && (
				<Link
					to={{
						pathname: viewPath,
						state: { [name]: data },
					}}
					className='btn btn-primary btn-sm'
				>
					View
				</Link>
			)}
			{'  '}
			{isEdit && (
				<Link
					to={{
						pathname: editPath,
						state: { [name]: data },
					}}
					className='btn btn-info btn-sm'
				>
					Edit
				</Link>
			)}{' '}
			<DeleteData
				view={view}
				classes='btn-sm'
				table={table}
				data={data.id}
				ondelete={() => onDelete(key)}
			>
				Delete
			</DeleteData>
		</>
	);
};

Actions.propTypes = {
	key: PropTypes.number,
	view: PropTypes.string,
	table: PropTypes.string,
	isView: PropTypes.bool,
	viewPath: PropTypes.string,
	data: PropTypes.object,
	onDelete: PropTypes.func,
	isEdit: PropTypes.bool,
	editPath: PropTypes.string,
	name: PropTypes.string,
};

export default Actions;
