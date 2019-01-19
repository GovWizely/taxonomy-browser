import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// import { Link, withRouter } from "react-router-dom";

class StartView extends Component {
  constructor() {
    super()
    this.state = {
      trade_topics: false,
      industries: false,
      countries: false,
      world_regions: false,
      trade_regions: false,
      US_trade_initiatives: false,
      types: [], // array of thesauri selected
      queryString: '',
    }
    this.handleCheck = this.handleCheck.bind(this); // from official docs
    // this.handleToggleAll = this.handleToggleAll.bind(this);
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheck = (name) => (event) => {
    console.log("A checkbox was checked!")
    this.setState({ [name]: event.target.checked });
  };

  handleToggleAll = (event) => {
    console.log("handleToggleAll() was triggered")
    let elem = document.querySelectorAll(".thesauri input");
    // console.log(elem);
    for (let el of elem) {
      if (el.checked === false) {
        console.log(el.getAttribute("name"));
        // console.log(el);
        // el.checked = event.target.checked;
        // el.checked = true;
        // this.handleCheck(el.getAttribute("name"));
        this.setState({ [el.getAttribute("name")]: el.checked });
      }
    }
  };

  areAllChecked = () => {
  };

  targetUrl = () => {
    // const API_KEY = "ShCzzrAkXLpMTsTlhFhUjD29";
    const thesauri = {
      trade_topics: this.state.trade_topics,
      industries: this.state.industries,
      countries: this.state.countries,
      world_regions: this.state.world_regions,
      trade_regions: this.state.trade_regions,
      US_trade_initiatives: this.state.US_trade_initiatives,
    }
    const types = [];

    Object.keys(thesauri).forEach(type => {
      if (!!thesauri[type]) {types.concat(type)}
    }) //this doesn't work
    
    console.log(types)
    // console.log(`Fetching from : https://api.trade.gov/ita_taxonomies/search?api_key=${API_KEY}&q=${this.state.queryString}&types=${types}`);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.targetUrl();
  }

  render() {
    // let isAllChecked = () => {Object.keys(this.state.thesauri).every(c => c.checked)};
  
    return (
      <div>
        <h1>Thesaurus of International Trade Terms</h1>
        <p>The International Trade Administration’s (ITA) Thesaurus of International Trade Terms is a controlled and structured list of words and phrases used to tag and index information found on the ITA’s websites and databases. The thesaurus covers all subjects related to international trade and foreign investment with particular emphasis on exporting, trade promotion, market access and enforcement and compliance.</p>

        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="center">
            <input type="text" name="queryString" placeholder="Enter search query" value={this.state.queryString} onChange={(event) => this.handleChange(event)}/>
            <button type="submit">Search</button>
          </div>
          <label className="col-1">Include in search:</label>
          <div className="col-2">
            <Checkbox onChange={(event) => this.handleToggleAll()} checked={this.areAllChecked()} color="primary"/>All<br/>

            <Checkbox onChange={this.handleCheck("trade_topics")} checked={this.state.trade_topics} className="thesauri" name="trade_topics" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#RBBed4Voz7iS3nUECA3yzNM">Trade Topics</a><br/>

            <Checkbox onChange={this.handleCheck("industries")} checked={this.state.industries} className="thesauri" name="industries" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#R79uIjoQaQ9KzvJfyB1H7Ru">Industries</a><br/>

            <Checkbox onChange={this.handleCheck("countries")} checked={this.state.countries} className="thesauri" name="countries" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#R8W91u35GBegWcXXFflYE4">Countries</a><br/>

          </div>
          <div className="col-3">
            <Checkbox onChange={this.handleCheck("world_regions")} checked={this.state.world_regions} className="thesauri" name="world_regions" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#R8cndKa2D8NuNg7djwJcXxB">World Regions</a><br/>

            <Checkbox onChange={this.handleCheck("trade_regions")} checked={this.state.trade_regions} className="thesauri" name="trade_regions" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#R7ySyiNxcfeZ6bfNjhocNun">Trade Regions</a><br/>

            <Checkbox onChange={this.handleCheck("US_trade_initiatives")} checked={this.state.US_trade_initiatives} className="thesauri" name="US_trade_initiatives" color="primary"/><a href="https://developer.trade.gov/taxonomy.html#RBqqOvJ9rXMcmc5SDhGjWTp">US Trade Initiatives</a><br/>

          </div>
        </form>
      </div>
    )
  }
}

export default StartView;