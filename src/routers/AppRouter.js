import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/posting/DashboardPage';
import CategorizedReads from '../components/CategorizedReads';
import Preferences from '../components/posting/preferences';
import Run from '../components/run/Run';
import NotFoundPage from '../components/NotFoundPage';
import AddPost from '../components/posting/AddPost';
import EditPost from '../components/posting/EditPost';
import HomeRead from '../components/home/HomeRead';
import AuthorSummary from '../components/reading/AuthorSummary';
import ReadPost from '../components/reading/ReadPost';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// create history props for Router to access history outside of components
// allow redirecting function of authentication status
export const history = createHistory();

const AppRouter = () => (
  // Router is used instead of browserRouter to allow passing down history props
  // that has been previously created
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact />
        <Route path="/home" component={HomeRead} />
        <Route path="/category/:id" component={CategorizedReads} />
        <Route exact path="/:id/read/" component={AuthorSummary} />
        <Route path="/:id/read/:id" component={ReadPost} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/run" component={Run} />
        <PrivateRoute path="/preferences" component={Preferences} />
        <PrivateRoute path="/create" component={AddPost} />
        <PrivateRoute path="/edit/:id" component={EditPost} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
