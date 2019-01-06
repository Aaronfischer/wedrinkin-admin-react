import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TopNavigation from './components/navigation/TopNavigation';
import HomePage from './components/pages/HomePage';
import DrinksPage from './components/pages/DrinksPage';
import DrinksAddPage from './components/pages/DrinksAddPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNavigation />
        <div className={'main-wrapper ui-push-left'}>
          <Grid>
            <Grid.Row columns="equal" className="row-padding">
              <Grid.Column>

                <Route path="/" exact component={HomePage} />
                <Route
                  path="/drinks"
                  exact
                  component={DrinksPage}
                />
                <Route
                  path="/drinks/add"
                  exact
                  component={DrinksAddPage}
                />

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
