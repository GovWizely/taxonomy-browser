import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ResultsList from './ResultsList';
import TermInfo from './TermInfo';
import Footer from './Footer';
import Thesauri from './Thesauri';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      json: {},
    };
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Thesauri} />
        {/* <Route exact path="/" render={(props) => <Thesauri {...props} API_KEY={this.props.API_KEY} />} /> */}


        <Route exact path="/resultsList" render={(props) => <ResultsList {...props} API_KEY={this.props.API_KEY} />} />
        {/*from the Thesauri component*/}

        <Route exact path="/resultsList/:id" render={(props) => <TermInfo {...props} API_KEY={this.props.API_KEY} />} />
        {/* from the ResultsList or another instance of TermInfo */}

        <Footer json={this.state.json} />
      </div>
    );
  }
}

export default App;
