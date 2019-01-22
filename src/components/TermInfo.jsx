import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

class TermInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageId: '',
      item: {
        sub_class_of: [{}],
        annotations: {},
        object_properties: { member_of: [{}], has_related: [{}], has_broader: [{}], is_in_scheme: [{}] },
        related_terms: {}
      },
      errorMessage: '',
      loading: false,
    }
  }

  targetUrl = () => {
    const id =  this.props.match.params.id;
    return `https://api.trade.gov/ita_taxonomies/${id}?api_key=${this.props.API_KEY}`;
  };

  fetchData = () => {
    fetch(this.targetUrl())
      .then(response => response.json())
      .then(response => this.setState({item: response, loading: false}))
      .catch(error => console.log(error), (error) => {
        this.setState({errorMessage: error, loading: false});
      })
  }

  componentDidMount = () => {
    this.setState({loading: true}, () => {
      this.fetchData();
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData(this.props.match.params.id);
    }
  }

  render() {
    // const {
    //   label,
    //   sub_class_of,
    //   annotations,
    //   object_properties,
    // } = this.state.item;

    console.log("TermInfo fetched from: "+this.targetUrl())
    console.log(this.state.item)

    return (
      <div>
        <div>
          <p>TermInfo fetched from: {this.targetUrl()}</p>
          {(this.state.item.member_of) ? (
            <h3>{this.state.item.object_properties.member_of[0].label} > </h3>
          ) : (
            <h3>{this.state.item.object_properties.has_broader[0].label} > </h3>
          )}
          
          <h1>{this.state.item.label}</h1>
        </div>
        
        <div className="termInfo">
          <h4>Term Information</h4>
          <p><b>Preferred Term: </b>{this.state.item.annotations.pref_label}</p>
          <p><b>Term Source: </b>{this.state.item.annotations.source}</p>
        </div>
        <div className="termRelation">
          <h4>Term Relationships</h4>
          <div className="broader">
            <b>Broader terms:</b>
            <ul>
              {this.state.item.sub_class_of.map(t => {
                return <li key={t.id}><Link to={{pathname: `/resultsList/${t.id}`, state: {pageId: t.id}}}>{t.label}</Link></li>
              })}
            </ul>
          </div>
          <div className="related">
            <b>Related terms: </b> {/* find one to try this with */}
            {/* {this.state.item.related_terms.forEach(term => term.label)} */}
          </div>
          <div className="narrower">
            <b>Narrower Terms: </b> {/* find one to try this with */}
            {/* {object_properties.narrower_terms.forEach(term => term.label)} */}
          </div>
          <hr />

          <b>Member of Concept Group: </b>

          <br />
          <b>Top Term of: </b>
        </div>
      </div>
    );
  }
}

export default withRouter(TermInfo);