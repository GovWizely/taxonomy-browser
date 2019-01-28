import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Loader from 'react-loader-spinner';
import Footer from './Footer';
class ResultsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfResults: 0,
      activePage: 1,
      itemsPerPage: 20,
      results: [],
      footerData: {},
      errorMessage: '',
      loading: false,
    }
  }


  searchUrl = () =>  {
    const size = this.state.itemsPerPage;
    const queryString = this.props.location.state.queryString;
    const types = this.props.location.state.typesChecked;
    return `https://api.trade.gov/ita_taxonomies/search?api_key=${this.props.API_KEY}&size=${size}&q=${queryString}&types=${types}&offset=${(this.state.activePage-1)*(size)}`
  };

  fetchResults = () => {
    console.log("ResultsList fetched from: " + this.searchUrl());
    this.setState({loading: true}, () => {
      fetch(this.searchUrl())
      .then(response => response.json())
      .then(response => this.setState({ results: response.results, footerData: response, numberOfResults: response.total, offset: response.offset, loading: false }))
      .catch(error => console.log(error), (error) => {
        this.setState({errorMessage: error, loading: false});
      })
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
        <h1>Search Results</h1>
        <p><b>{this.state.numberOfResults} results:</b></p>

        {(this.state.loading) ? (
          <div className="spinner"><Loader type="ThreeDots" color="#00CC66" width="100"/></div>
        ) : (
          <ul>
            {this.state.results.map(item => {
              return <li key={item.id}><Link to={{pathname: `/id/${item.id}`, state: {pageId: item.id}}}>{item.label}</Link></li>
            })}
          </ul>
        )}
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
        <br />
        <Footer json={this.state.footerData}/>
      </div>
    );
  }
}

export default withRouter(ResultsList);