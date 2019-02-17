import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import ResultsList from './ResultsList';
import TermInfo from './TermInfo';

class App extends Component {
  render() {
    return (
      <div className="taxonomy_container">
        <Route exact path={`/`} render={(props) => <SearchBar {...props} BASE_URL={this.props.BASE_URL} API_KEY={this.props.API_KEY} />} />
        <Route path={`/search`} render={(props) => <ResultsList {...props} BASE_URL={this.props.BASE_URL} API_KEY={this.props.API_KEY} />} />
        <Route exact path={`/id/:id`} render={(props) => <TermInfo {...props} BASE_URL={this.props.BASE_URL} API_KEY={this.props.API_KEY} location={props.location} />} />
      </div>
    );
  }
}

export default withRouter(App);