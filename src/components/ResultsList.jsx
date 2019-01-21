import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";

class ResultsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfResults: 0,
      activePage: 1,
      itemsPerPage: 20,
      results: [],
      errorMessage: '',
    }
  }


  searchUrl = () =>  (`https://api.trade.gov/ita_taxonomies/search?api_key=${this.props.API_KEY}&size=${this.state.itemsPerPage}&q=${this.props.location.state.queryString}&types=${this.props.location.state.typesChecked}&offset=${(this.state.activePage-1)*(this.state.itemsPerPage)}`);

  fetchResults = () => {
    console.log("ResultsList fetched from: " + this.searchUrl());
    fetch(this.searchUrl())
      .then(response => response.json())
      .then(response => this.setState({ results: response.results, numberOfResults: response.total, offset: response.offset }))
      .catch(error => console.log(error), (error) => {
        this.setState({errorMessage: error});
      })
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => this.fetchResults());
  }

  componentDidMount = () => {
    this.fetchResults();
  }

  render() {

    return (
      <div className="resultsList">
        <p>ResultsList fetched from: {this.searchUrl()}</p>
        <p>{this.state.numberOfResults} results:</p>
        <ul>
          {this.state.results.map(item => {
            return <li key={item.id}><Link to={{pathname: `/resultsList/${item.id}`}}>{item.label}</Link></li>
          })}
        </ul>

        <Pagination 
          activePage={this.state.activePage}
          totalItemsCount={this.state.numberOfResults}
          itemsCountPerPage={this.state.itemsPerPage}
          firstPageText="First"
          prevPageText="<"
          nextPageText=">"
          lastPageText="Last"
          onChange={(pageNumber) => this.handlePageChange(pageNumber)}
        />
      </div>
    );
  }
}

export default withRouter(ResultsList);