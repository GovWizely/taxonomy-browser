import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import Footer from './Footer';
import '../taxonomy-browser.css';

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      queryString: "",
      autosuggestions: [],
      selectedTopic: "",
      footerData: {},
    }
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectSuggestion = this.onSelectSuggestion.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.retrieveSuggestions = this.retrieveSuggestions.bind(this);
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.initiateSuggestions);
  };

  handleChangeTopic(e) {
    this.setState({selectedTopic: e.target.value}, () => {
      return this.initiateSuggestions;
    });
  };

  initiateSuggestions = () => {
    if (this.state.queryString.length > 1) {
      this.retrieveSuggestions(this.state.queryString);
    } else {
      this.setState({ autosuggestions: [] })
    }
  }

  onSelectSuggestion(val){
    this.setState({ queryString: val }, () => {
      this.props.history.push({ pathname: `/search`, search: `&q=${this.state.queryString}&types=${this.state.selectedTopic}` });
    });
  };

  retrieveSuggestions(value) {
    this.setState({autosuggestions: []});
    let searchUrl = (
      `${this.props.BASE_URL}/ita_taxonomies/search?api_key=${this.props.API_KEY}&q=${value}&types=${this.state.selectedTopic}`
    );
    fetch(searchUrl)
    .then(response => response.json())
    .then(response => this.setState({autosuggestions: response.results}))
  }

  getItemValue(item) {
    return `${item.label}`
  }

  renderItem(item, isHighlighted){
    return (
      <div key={item.id} style={{ background: isHighlighted ? 'lightblue' : 'white', textAlign: 'left', 'paddingTop': '5px', 'paddingBottom': '5px' }}>
        <Link to={{pathname: `/id/${item.id}`, state: {pageId: item.id}}} style={{ 'textDecoration': 'none', 'color': '#292a2b', 'fontSize': '11.5pt' }}>
          {item.label}
        </Link>
      </div>
    ); 
  };

  render() {
    return (
      <div>
        <h1>Thesaurus of International Trade Terms</h1>
        <p>The International Trade Administration’s (ITA) Thesaurus of International Trade Terms is a controlled and structured list of words and phrases used to tag and index information found on the ITA’s websites and databases. The thesaurus covers all subjects related to international trade and foreign investment with particular emphasis on exporting, trade promotion, market access and enforcement and compliance.</p>

        <form onSubmit={(event) => event.preventDefault()} className="center taxonomy-search-form">
          <label aria-label="Select a Category">
            <select value={this.state.selectedTopic} onChange={this.handleChangeTopic} className="dropdown">
              <option value="">All Categories</option>
              <option value="Industries">Industries</option>
              <option value="Countries">Countries</option>
              <option value="World Regions">World Regions</option>
              <option value="Trade Regions">Trade Regions</option>
              <option value="Trade Topics">Trade Topics</option>
            </select>
          </label>
          <Autocomplete
            inputProps = {{
              type: 'text',
              name: "queryString",
              id: "queryString",
              placeholder: "Enter search query",
              'aria-label': "Enter search query",
            }}
            autoHighlight={false}
            value={this.state.queryString}
            items={this.state.autosuggestions} 
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            onChange={this.handleChange}
            onSelect={this.onSelectSuggestion}
          />
          <Link to={{pathname: `/search`, search: `&q=${this.state.queryString}&types=${this.state.selectedTopic}`}}>
            <button>Search</button>
          </Link>
        </form>
        
        <div className="categoryList">
          <p><b>Browse By: </b></p>
          <ul>
            <li><Link to={{pathname: "/#id/R79uIjoQaQ9KzvJfyB1H7Ru"}}>Industries</Link></li>
            <li><Link to={{pathname: "/#id/R8W91u35GBegWcXXFflYE4"}}>Countries</Link></li>
            <li><Link to={{pathname: "/#id/R8cndKa2D8NuNg7djwJcXxB"}}>World Regions</Link></li>
            <li><Link to={{pathname: "/#id/R7ySyiNxcfeZ6bfNjhocNun"}}>Trade Regions</Link></li>
            <li><Link to={{pathname: "/#id/RBBed4Voz7iS3nUECA3yzNM"}}>Trade Topics</Link></li>
          </ul>
        </div>
        
        <Footer json={this.state.footerData}/>
        
      </div>
    )
  }
}

export default withRouter(SearchBar);