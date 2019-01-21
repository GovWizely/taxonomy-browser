import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

class TermInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      errorMessage: '',
    }
  }

  targetUrl = () => `https://api.trade.gov/ita_taxonomies/${this.props.match.params.id}?api_key=${this.props.API_KEY}`;

  componentDidMount = () => {
    fetch(this.targetUrl())
      .then(response => response.json())
      .then(response => this.setState({item: response}))
      .catch(error => console.log(error), (error) => {
        this.setState({errorMessage: error});
      })
  }

  render() {

    const {
      label,
      sub_class_of,
      annotations,
      object_properties,
    } = this.state.item;

    console.log("TermInfo fetched from: "+this.targetUrl())
    console.log(this.state.item)

    return (
      <div>
        <div>
          <p>TermInfo fetched from: {this.targetUrl()}</p>
          {/* <h3>{`${object_properties.member_of[0].label} >`}</h3> */}
          <h1>{label}</h1>
        </div>
        
        {/* <div className="termInfo">
          <h4>Term Information</h4>
          <p><b>Preferred Term: </b>{annotations["Preferred Term"]}</p>
          <p><b>Term Source: </b>{annotations["Term Source"]}</p>
        </div>
        <div className="termRelation">
          <h4>Term Relationships</h4>
          <div className="broader">
            <b>Broader terms:</b>
            {sub_class_of[0].label}
            link to this term
          </div>
          <div className="related">
            <b>Related terms: </b>
            {object_properties["Related Terms"].forEach(term => term.label)}
          </div>
          <div className="narrower">
            <b>Narrower Terms: </b>
            {object_properties["Narrower Terms"].forEach(term => term.label)}
          </div>
          <hr />

          <b>Member of Concept Group: </b>

          <br />
          <b>Top Term of: </b>
        </div> */}
      </div>
    );
  }
}

export default withRouter(TermInfo);