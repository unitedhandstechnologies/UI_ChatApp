import React, { memo, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
const Admin = React.lazy(() =>
	import(/* webpackChunkName: "admin" */ './Admin')
);
const Web = React.lazy(() => import(/* webpackChunkName: "website" */ './web'));
const Routes = () => {
	return (
		<Suspense fallback={<div className='loading' />}>
			<Router>
				<Switch>
					<Route path='/admin' component={Admin} />
					<Route path='/' component={Web} />
				</Switch>
			</Router>
		</Suspense>
	);
};

export default memo(Routes);
