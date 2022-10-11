import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';

const Default = React.lazy(() =>
	import(/* webpackChunkName: "dashboards" */ './dashboards/default')
);
const Users = React.lazy(() =>
	import(/* webpackChunkName: "users" */ './users')
);
const Advisors = React.lazy(() =>
	import(/* webpackChunkName: "Advisors" */ './Advisors')
);
const AddAdvisor = React.lazy(() =>
	import(/* webpackChunkName: "Add-Advisor" */ './Advisors/AddAdvisors')
);
const EditAdvisor = React.lazy(() =>
	import(/* webpackChunkName: "edit-Advisor" */ './Advisors/EditAdvisors')
);
const AdvisorDetails = React.lazy(() =>
	import(/* webpackChunkName: "Advisor-details" */ './Advisors/AdvisorsDetails')
);
const Push = React.lazy(() =>
	import(/* webpackChunkName: "add class" */ './push')
);
const UserDetails = React.lazy(() =>
	import(/* webpackChunkName: "user Details" */ './userDetails')
);
const AppInformation = React.lazy(() =>
	import(/* webpackChunkName: "app-info" */ './AppInformations')
);
const AddUser = React.lazy(() =>
	import(/* webpackChunkName: "add-users" */ './Users/AddUser')
);
const EditUser = React.lazy(() =>
	import(/* webpackChunkName: "edit-group" */ './Users/EditUser')
);
const Profile = React.lazy(() =>
	import(/* webpackChunkName: "admin-profile" */ './profile')
);

const AppSetting = React.lazy(() =>
	import(/* webpackChunkName: "AppSetting" */ './AppSettings')
);

const Consultations = React.lazy(() =>
	import(/* webpackChunkName: "Consultations" */ './Consultation')
);

class App extends Component {
	render() {
		return (
			<AppLayout>
				<div className='dashboard-wrapper animate__animated  animate__zoomIn'>
					<Suspense fallback={<div className='loading' />}>
						<Switch>
							<Redirect exact from={`/`} to={`/dashboards`} />
							<Route
								exact
								path='/dashboards'
								render={(props) => <Default {...props} />}
							/>
							<Route
								path='/users/:status?'
								render={(props) => <Users {...props} />}
							/>
							<Route path='/push' render={(props) => <Push {...props} />} />
							<Route
								path={`/user-details`}
								render={(props) => <UserDetails {...props} />}
							/>
							<Route path='/add-user' component={AddUser} />
							<Route path='/edit-user' component={EditUser} />
							<Route path='/advisors' component={Advisors} />
							<Route path='/edit-advisor' component={EditAdvisor} />
							<Route path='/add-advisor' component={AddAdvisor} />
							<Route path='/app-settings' component={AppSetting} />
							<Route path='/advisor-details' component={AdvisorDetails} />
							<Route path='/edit-user' component={EditUser} />
							<Route path='/profile' component={Profile} />

							<Route path='/consultations/:status?' component={Consultations} />

							<Route
								path='/app-information'
								render={(props) => <AppInformation {...props} />}
							/>
							<Redirect to='/error' />
						</Switch>
					</Suspense>
				</div>
			</AppLayout>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames } = menu;
	return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
