import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import StartView from './StartView';
import ResultsList from './ResultsList';
import TermInfo from './TermInfo';
import Footer from './Footer';
import Thesauri from './Thesauri';

class App extends Component {
  constructor() {
    super()
    this.state = {
      json: {},
    };
  };

  render() {
    return (
      <div className="App">
        {/* <Route exact path="/" component={StartView} /> */}
        <Route exact path="/" component={Thesauri} />
        <Route exact path="/?#search/{query}" component={ResultsList} />
        <Route exact path="/?#{JSONid}" component={TermInfo} />
        {/* omit the `?` for thesauri */}
        <Footer json={this.state.json} />
      </div>
    );
  }
}

export default App;
