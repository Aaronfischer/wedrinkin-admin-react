import React from 'react';
// import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import DrinksPage from './components/pages/DrinksPage';
import DrinkPage from './components/pages/DrinkPage';
import NewDrinkPage from './components/pages/NewDrinkPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import './App.css';
import { Consumer } from './store';

const App = () => (
  <Consumer
    mapStateToProps={state => ({
      isAuthenticated: state.isAuthenticated,
    })}
  >
    {({ isAuthenticated, actions, location }) => {
      console.log('isAuthenticated', isAuthenticated);
      console.log('actions', actions);
      console.log('location', location);
      return (
        <div>
          {isAuthenticated && <TopNavigation location={location} />}
          <div className={'main-wrapper ' + (isAuthenticated ? 'ui-push-left' : '')}>
            <Grid>
              <Grid.Row columns="equal" className="row-padding">
                <Grid.Column>
                  <Route location={location} path="/" exact component={HomePage} />
                  <Route
                    location={location}
                    path="/confirmation/:token"
                    exact
                    component={ConfirmationPage}
                  />
                  <GuestRoute
                    location={location}
                    path="/login"
                    exact
                    component={LoginPage}
                  />
                  <GuestRoute
                    location={location}
                    path="/signup"
                    exact
                    component={SignupPage}
                  />
                  <GuestRoute
                    location={location}
                    path="/forgot-password"
                    exact
                    component={ForgotPasswordPage}
                  />
                  <GuestRoute
                    location={location}
                    path="/reset-password/:token"
                    exact
                    component={ResetPasswordPage}
                  />
                  <UserRoute
                    location={location}
                    path="/dashboard"
                    exact
                    component={DashboardPage}
                  />
                  <UserRoute
                    location={location}
                    path="/drinks"
                    exact
                    component={DrinksPage}
                  />
                  {/* Wrap in Switch to match to the first path, fixes /drinks/add matching /drinks/:id */}
                  <Switch>
                    <UserRoute
                      location={location}
                      path="/drinks/add"
                      exact
                      component={NewDrinkPage}
                    />
                    <UserRoute
                      location={location}
                      path="/drinks/:id"
                      exact
                      component={DrinkPage}
                    />
                  </Switch>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )
    }}
  </Consumer>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  // isAuthenticated: PropTypes.bool.isRequired
};

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: !!state.user.email
//   };
// }

export default App;
