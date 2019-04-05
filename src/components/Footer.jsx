import React, {Component} from 'react';
import JSONPretty from 'react-json-pretty';
import downloadIcon from '../images/download.svg';

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      jsonToggle: false,
    }
  }

  toggleJson = () => {
    this.setState({ jsonToggle: !this.state.jsonToggle});
  }

  render() {
    return (
      <div className="footer">
        <h3>For Developers</h3> <br/>

        <button onClick={this.toggleJson}>JSON</button> {/* reveals a collapsible div which shows the contents of this.props.json */}
        <a download="ITA Taxonomy Definitions - External 032519.xlsx" href="ITA Taxonomy Definitions - External 032519.xlsx">
          Download Taxonomy <img src={downloadIcon} alt="download" />
        </a>
        
        <p>The thesaurus is available to the software developer community as a JSON endpoint.</p>
        <p>The thesaurus was developed by ITA’s staff of international trade specialists, consulting several authoritative sources and vocabularies covering the language of international trade and investment.</p>
        { this.state.jsonToggle ? <JSONPretty data={this.props.json} /> : null }

      </div>
    )
  }
}

export default Footer;