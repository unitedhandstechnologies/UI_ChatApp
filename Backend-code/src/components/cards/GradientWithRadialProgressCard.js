import React from 'react';
import { Card, CardBody } from 'reactstrap';

const GradientWithRadialProgressCard = ({
	icon = 'iconsminds-bell',
	title = 'title',
	detail = 'detail',
	percent = 80,
	progressText = '8/10',
	isDanger = false,
}) => {
	return (
		<Card className={`progress-banner ${isDanger && 'isdanger'}`}>
			<CardBody className='justify-content-between d-flex flex-row align-items-center'>
				<div className='d-flex justify-content-center align-items-center'>
					<i
						className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
					/>
					<div className='ml-4'>
						<p className='lead text-white'>{title}</p>
						<p className='text-small text-white'>{detail}</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
export default GradientWithRadialProgressCard;
