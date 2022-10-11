import React, { memo } from 'react';
import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
} from 'react-router-dom';
import { checkAuth } from 'utils/helper';
import Error from 'views/error';
const AuthRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				checkAuth('LoginUser') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

const AdminView = React.lazy(() =>
	import(/* webpackChunkName: "dashboard" */ './Routes')
);
const Login = React.lazy(() =>
	import(/* webpackChunkName: "login" */ './Login')
);

const Signup = React.lazy(() =>
	import(/* webpackChunkName: "signup" */ './Signup')
);
const ForgotPassword = React.lazy(() =>
	import(/* webpackChunkName: "ForgotPassword" */ './Forgetpassword')
);

const Admin = () => {
	return (
		<Router basename='admin'>
			<Switch>
				<Route expect path='/login' component={Login} />
				<Route expect path='/signup' component={Signup} />
				<Route expect path='/forgot-password' component={ForgotPassword} />
				<Route path='/error' component={Error} />
				{<AuthRoute path='/' component={AdminView} />}
			</Switch>
		</Router>
	);
};

export default memo(Admin);
