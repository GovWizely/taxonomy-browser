import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import arrow from '../Right_Arrow.png';
import Footer from './Footer';

class TermInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        object_properties: { member_of: [{}], has_related: [{}], has_broader: [{}], has_narrower: [{}], is_in_scheme: [{}], is_top_concept_in_scheme: [{}] },
        sub_class_of: [{}],
        annotations: {},
        related_terms: {},
        type: [],
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
    const {
      label,
      sub_class_of,
      annotations,
      object_properties,
      // related_terms,
      type,
    } = this.state.item;

    console.log("TermInfo fetched from: "+this.targetUrl())
    console.log(this.state.item)

    return (
      <div>
        <div className="breadcrumb">

          <h4><Link to={{pathname: `/`}}>ITA Thesaurus</Link> > </h4>

          {type ? (<h3>{type[0]} > </h3>) : null} {/* [TODO] this doesn't come with an id, need to make a link manually */}

          {(object_properties.member_of) ? (
            <h3>{object_properties.member_of[0].label} > </h3>
          ) : (
            <h3>{sub_class_of[0].label} > </h3>
          )}                              {/* [TODO] add links */}

          <h1>{label}</h1>

        </div>
        <div className="termInfo">
          <span><h3>Term Information</h3></span>
          <p><b>Preferred Term: </b>{annotations.pref_label}</p>
          {annotations.alt_label ? (<p><b>Alternative term: </b>{annotations.alt_label}</p>) : null}
          {annotations.definition ? (<p><b>Description: </b>{annotations.definition}</p>) : null}
          <p><b>Term Source: </b>{annotations.source}</p>
        </div>
        <div className="termRelation">
          <span><h3>Term Relationships</h3></span>
          <div className="broader">
            <b><p>Broader terms: </p></b>
            <ul>
              {object_properties.has_broader ? (object_properties.has_broader.map((t, i) => {
                return <li key={i}><Link to={{pathname: `/resultsList/${t.id}`, state: {pageId: t.id}}}>{t.label}</Link></li>
              }) ) : null }
            </ul>
          </div>
          
          <img src={arrow} alt="arrow pointing right"/>

          <div className="related">
            <b><p>Related terms: </p></b>
            <ul>
              {object_properties.has_related ? (object_properties.has_related.map((t, i) => {
                return <li key={i}><Link to={{pathname: `/resultsList/${t.id}`, state: {pageId: t.id}}}>{t.label}</Link></li>
              }) ) : null}
            </ul>
          </div>

          <img src={arrow} alt="arrow pointing right"/>

          <div className="narrower">
            <b><p>Narrower Terms: </p></b>
            <ul>
              {object_properties.has_narrower ? (object_properties.has_narrower.map((t, i) => {
                return <li key={i}><Link to={{pathname: `/resultsList/${t.id}`, state: {pageId: t.id}}}>{t.label}</Link></li>
              }) ) : null}
            </ul>
          </div>

          <hr/>
          <b><p>Member of Concept Group: </p></b>
            <ul>
              {type ? (type.map((t, i) => <li key={i}>{t}</li>)) : null} {/* [TODO] these don't come with ids, need to make links manually */}
            </ul>
          <b><p>Top Term of: </p></b>
            {object_properties.is_top_concept_in_scheme ? (
              object_properties.is_top_concept_in_scheme.map((t, i) => {
                return <li key={i}><Link to={{pathname: `/`}}>{t.label}</Link></li>
              }) ) : null }
        </div>
        <Footer json={this.state.item}/>
      </div>
    );
  }
}

export default withRouter(TermInfo);