import React, { Fragment, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import { dashBoard } from 'Apis/admin';
import { NotificationManager } from 'components/common/react-notifications';
const DefaultDashboard = React.memo(() => {
	const [dashBoardData, setDashboardData] = useState({
		totalUser: 0,
		totalAdvisor: 0,
		activeConsultations: 0,
		pastConsultations: 0,
		dailyMints: 0,
		weaklyMints: 0,
	});
	useEffect(() => {
		dashBoard()
			.then((res) => {
				const { data } = res;
				console.log(data);
				updateData(data.data);
			})
			.catch((err) => {
				if (err.response) {
					const { data } = err.response;
					NotificationManager.warning(
						data.error_message,
						'Something went wrong',
						4000,
						null,
						null,
						''
					);
				}
			});
	}, []);
	const updateData = (data) => {
		setDashboardData({ ...data });
	};
	return (
		<div className='h-100'>
			<Row>
				<Colxx xxs='12'>
					<h1>Dashboard</h1>
					<Separator className='mb-5' />
				</Colxx>
			</Row>
			<Row>
				<Colxx lg='12' md='12'>
					<Row>
						<Colxx lg='4' xl='4' className='mb-4'>
							<Link to='/users'>
								<GradientWithRadialProgressCard
									icon='iconsminds-male-female'
									title={`${dashBoardData.totalUser} Total Users`}
									detail=''
								/>
							</Link>
						</Colxx>
						<Colxx lg='4' xl='4' className='mb-4'>
							<Link to='/advisors'>
								<GradientWithRadialProgressCard
									icon='iconsminds-business-mens'
									title={`${dashBoardData.totalAdvisor} Total Advisors`}
									detail=''
								/>
							</Link>
						</Colxx>
						<Colxx lg='4' xl='4' className='mb-4'>
							<Link to='/consultations/1'>
								<GradientWithRadialProgressCard
									icon='iconsminds-speach-bubble-comic-2'
									title={`${dashBoardData.activeConsultations} Active Consultations`}
									detail=''
								/>
							</Link>
						</Colxx>
						<Colxx lg='4' xl='4' className='mb-4'>
							<Link to='/consultations/0'>
								<GradientWithRadialProgressCard
									icon='iconsminds-speach-bubble-comic-3'
									title={`${dashBoardData.pastConsultations} Past Closed Consultations`}
									detail=''
								/>
							</Link>
						</Colxx>
						<Colxx lg='4' xl='4' className='mb-4'>
							<GradientWithRadialProgressCard
								icon='iconsminds-over-time-2'
								title={`${dashBoardData.dailyMints} Daily Minutes on Consultations`}
								detail=''
							/>
						</Colxx>
						<Colxx lg='4' xl='4' className='mb-4'>
							<GradientWithRadialProgressCard
								icon='iconsminds-24-hour'
								title={`${dashBoardData.weaklyMints} Weakly Minutes on the Consultations`}
								detail=''
							/>
						</Colxx>
					</Row>
				</Colxx>
			</Row>
		</div>
	);
});
export default injectIntl(DefaultDashboard);
