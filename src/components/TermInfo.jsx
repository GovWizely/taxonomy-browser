import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import arrow from '../Right_Arrow.png';
// import Footer from './Footer';
import topics from '../topics';
class TermInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        type: [],
        sub_class_of: [{}],
        annotations: {},
        related_terms: {}, // unused
        object_properties: { member_of: [{}], has_related: [{}], has_broader: [{}], has_narrower: [{}], has_member: [{}], is_in_scheme: [{}], is_top_concept_in_scheme: [{}], micro_thesaurus_of: [{}] },
      },
      errorMessage: "",
      loading: false,
      queryString: "",
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
      type,
      annotations,
      sub_class_of,
      object_properties,
      // related_terms,
    } = this.state.item;

    console.log("TermInfo fetched from: " + this.targetUrl())
    console.log(this.state.item)

    const subTopic = () => {  // "member_of" or "sub_class_of"
      if (object_properties.member_of) return (<h2><Link to={{pathname: `/id/${object_properties.member_of[0].id}`}}>{object_properties.member_of[0].label}</Link> > </h2>)
      else if (sub_class_of[0]) return (<h2><Link to={{pathname: `/id/${sub_class_of[0].id}`}}>{sub_class_of[0].label}</Link> > </h2>)
      else return null
    }

    const description = () => { // "definition", "scope_note", or "comment"
      if (annotations.definition) { return (<p><b>Description: </b>{annotations.definition}</p>) }
      else if (annotations.scope_note) { return (<p><b>Description: </b>{annotations.scope_note}</p>) }
      else if (annotations.comment) { return (<p><b>Description: </b>{annotations.comment}</p>) }
      else return null
    }

    const sortedTerms = (attribute) => {
      if (attribute) {
        return attribute.sort(function(a, b) {
          if (a.label < b.label) { return -1 }
          if (a.label > b.label) { return 1 }
          return 0;
        }).map((t, i) => {
          return <li key={i}><Link to={{pathname: `/id/${t.id}`}}>{t.label}</Link></li>          
        })
      } else return null
    }

    const narrowerTerms = () => {  // "has_narrower" or "has_member"
      if (object_properties.has_narrower) {
        return sortedTerms(object_properties.has_narrower)
      } else if (object_properties.has_member) {
        return sortedTerms(object_properties.has_member)
      } else return null
    }

    const memberOfConceptGroup = () => {  // "type", "member_of", or "sub_class_of"
      if (type.length > 0) {
        return (type.map((t, i) => <Link to={{pathname: `/id/${topics[t].id}`}} key={i}>{t}</Link>))
      } else if (object_properties.member_of) {
        return <Link to={{pathname: `/id/${object_properties.member_of[0].id}`}}>{object_properties.member_of[0].label}</Link>
      } else if (sub_class_of.length > 0) {
        return (sub_class_of.map((t, i) => {
          return <Link to={{pathname: `/id/${t.id}`}} key={i}>{t.label}</Link>
        }) )      
      } else return null
    }

    return (
      <div>
        <form className="newSearch" onSubmit={(event) => event.preventDefault()}>
          <input type="text" name="queryString" aria-label="Enter search query" value={this.state.queryString} onChange={(event) => this.handleChange(event)}/>
          <Link to={{pathname: `/search`, search: `&q=${this.state.queryString}&types=` }}>
            <button>Search</button>
          </Link>
        </form>
        <div className="breadcrumbs">
          {/* Top Level */} <h4><Link to={{pathname: `/`}}>ITA Thesaurus</Link> > </h4>
          {/* Type or Topic */} {(type.length > 0) ? (<h3><Link to={{pathname: `/id/${topics[type[0]].id}`}}>{type[0]}</Link> > </h3>) : null} 
          {/* SubTopic */} {subTopic()}                              
          {/* Term */} <h1>{label}</h1>
        </div>

        <div className="termInfo">
          <span><h2>Term Information</h2></span>
            {annotations.pref_label ? (<p><b>Preferred Term: </b>{annotations.pref_label}</p>) : null}
            {annotations.alt_label ? (<p><b>Alternative term: </b>{annotations.alt_label}</p>) : null}
            {description()}
            {annotations.source ? (<p><b>Term Source: </b>{annotations.source}</p>) : null}
        </div>

        <div className="termRelation">
          <span><h2>Term Relationships</h2></span>
          <div className="broader">
            <b><p>Broader terms: </p></b>
            <ul>
              {sortedTerms(object_properties.has_broader)}
            </ul>
          </div>
          
          <img src={arrow} alt="arrow pointing right"/>

          <div className="related">
            <b><p>Related terms: </p></b>
            <ul>
              {sortedTerms(object_properties.has_related)}
            </ul>
          </div>

          <img src={arrow} alt="arrow pointing right"/>

          <div className="narrower">
            <b><p>Narrower Terms: </p></b>
            <ul>
              {narrowerTerms()}
            </ul>
          </div>
        </div>

        <hr/>

        <div className="superTerms">
          {memberOfConceptGroup() ? (
              <p><b>Member of Concept Group: </b>{memberOfConceptGroup()}</p>
          ) : null}
        
          {object_properties.is_top_concept_in_scheme ? (
            <p><b>Top Term of: </b> {object_properties.is_top_concept_in_scheme.map((t, i) => {
              return (<Link key={i} to={{pathname: `/`}}>{t.label}</Link>) })}</p> ) : null }
          
          {(object_properties.micro_thesaurus_of) ? (
            <p><b>Microthesaurus of: </b>
            <Link to={{pathname: `/`}}>{object_properties.micro_thesaurus_of[0].label}</Link></p>
          ) : null }

        </div>
        {/* <Footer json={this.state.item}/> */}
      </div>
    );
  }
}

export default withRouter(TermInfo);