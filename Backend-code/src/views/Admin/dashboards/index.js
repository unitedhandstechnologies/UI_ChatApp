import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`/`} to={`/default`} />
      <Route
        path={`/default`}
        render={props => <DashboardDefault {...props} />}
      />
    </Switch>
  </Suspense>
);
export default Dashboards;
