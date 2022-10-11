import React, { Component, Fragment } from 'react';
import Lightbox from 'react-image-lightbox';
import { Modal, ModalHeader, CardImg, ModalBody } from 'reactstrap';
class SingleLightbox extends Component {
	constructor(props) {
		super(props);
		this.onThumbClick = this.onThumbClick.bind(this);
		this.state = {
			photoIndex: 0,
			isOpen: false,
			showModel: false,
		};
	}

	onThumbClick() {
		this.setState({ isOpen: true });
	}
	openModel = () => {
		this.setState({ showModel: true });
	};
	disableModel = () => {
		this.setState({ showModel: false });
	};

	render() {
		const { isOpen, showModel } = this.state;

		return (
			<Fragment>
				<Modal isOpen={showModel} size='lg' toggle={() => this.disableModel()}>
					<ModalHeader toggle={() => this.disableModel()}>
						Image Perview
					</ModalHeader>
					<ModalBody>
						<CardImg top alt={this.props.thumb} src={this.props.thumb} />
					</ModalBody>
				</Modal>
				<div style={{ cursor: 'pointer' }} onClick={() => this.openModel()}>
					<img
						src={this.props.thumb}
						alt='thumbnail'
						className={this.props.className}
					/>
				</div>

				{isOpen && (
					<Lightbox
						mainSrc={this.props.large}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</Fragment>
		);
	}
}

export default SingleLightbox;
