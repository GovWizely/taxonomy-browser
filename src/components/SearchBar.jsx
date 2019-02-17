import React, { Component } from 'react';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import '../style.css';

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      queryString: "",
      autosuggestions: [],
      selectedTopic: {value: "", label: "All Categories"},
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

  handleChangeTopic(selectedTopic) {
    this.setState({selectedTopic: selectedTopic}, this.initiateSuggestions);
  };

  initiateSuggestions = () => {
    if (this.state.queryString.length > 3) {
      this.retrieveSuggestions(this.state.queryString);
    } else {
      this.setState({ autosuggestions: [] })
    }
  }

  onSelectSuggestion(val){
    this.setState({ queryString: val });
  };

  retrieveSuggestions(value) {
    this.setState({autosuggestions: []});
    let searchUrl = (
      `${this.props.BASE_URL}/ita_taxonomies/search?api_key=${this.props.API_KEY}&q=${value}&types=${this.state.selectedTopic.value}`
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
          <Select 
            options={topics}
            onChange={this.handleChangeTopic} 
            value={this.state.selectedTopic} 
            aria-label="Select a Topic" 
            className="Select"
            classNamePrefix="Select"
          />
          <Autocomplete
            inputProps = {{
              type: 'text',
              name: "queryString",
              id: "queryString",
              placeholder: "Enter search query",
              'aria-label': "Enter search query",
            }}
            value={this.state.queryString}
            items={this.state.autosuggestions} 
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            onChange={this.handleChange}
            onSelect={this.onSelectSuggestion}
          />
          <Link to={{pathname: `/search`, search: `&q=${this.state.queryString}&types=${this.state.selectedTopic.value}`}}>
            <button>Search</button>
          </Link>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar);

const topics = [
  {value: "", label: "All Categories"},
  {value: "Industries", label: "Industries", id: "R79uIjoQaQ9KzvJfyB1H7Ru" },
  {value: "Countries", label: "Countries", id: "R8W91u35GBegWcXXFflYE4" },
  {value: "World Regions", label: "World Regions", id: "R8cndKa2D8NuNg7djwJcXxB" },
  {value: "Trade Regions", label: "Trade Regions", id: "R7ySyiNxcfeZ6bfNjhocNun" },
  {value: "Trade Topics", label: "Trade Topics", id: "RBBed4Voz7iS3nUECA3yzNM" },
];