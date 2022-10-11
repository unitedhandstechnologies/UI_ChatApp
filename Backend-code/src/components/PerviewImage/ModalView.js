import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, CardImg } from 'reactstrap';
const ImagePreView = ({ showModel, onClose, imagePath, name }) => {
	return (
		<Modal isOpen={showModel} size='lg' toggle={() => onClose(false)}>
			<ModalHeader toggle={() => onClose(false)}>
				{name || 'Image Preview'}
			</ModalHeader>
			<ModalBody>
				<CardImg top alt={imagePath} src={imagePath} />
			</ModalBody>
		</Modal>
	);
};
ImagePreView.propTypes = {
	showModel: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	imagePath: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default ImagePreView;
