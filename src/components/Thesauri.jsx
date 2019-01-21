import React, { Component } from "react";
import Column from './Column';
import { Checkbox } from "@material-ui/core";
import { Link, withRouter } from 'react-router-dom';


class Thesauri extends Component {
  constructor() {
    super()
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

    this.state = {
      /* Checkboxes */
      columns: [
        {
          name: "col-2",
          items: [
            { name: "**Trade Topics", value: "Trade Topics", id: "RBBed4Voz7iS3nUECA3yzNM" },
            { name: "Industries", value: "Industries", id: "R79uIjoQaQ9KzvJfyB1H7Ru" },
            { name: "Countries", value: "Countries", id: "R8W91u35GBegWcXXFflYE4" },
          ]
        },
        {
          name: "col-3",
          items: [
            { name: "World Regions", value: "World Regions", id: "R8cndKa2D8NuNg7djwJcXxB" },
            { name: "Trade Regions", value: "Trade Regions", id: "R7ySyiNxcfeZ6bfNjhocNun" },
            { name: "**US Trade Initiatives", value: "US Trade Initiatives", id: "RBqqOvJ9rXMcmc5SDhGjWTp" },
          ]
        }
      ],
      checkedListAll: [],
      AllItemsChecked: false,
      /* form */
      queryString: '',
    };
  };

  selectedItems(e) {
    const { value, checked } = e.target;
    let { checkedListAll } = this.state;

    if (checked) {
      checkedListAll = [...checkedListAll, value];
    } else {
      checkedListAll = checkedListAll.filter(el => el !== value);
      if (this.state.AllItemsChecked) {
        this.setState({
          AllItemsChecked: !this.state.AllItemsChecked
        });
      }
    }
    this.setState({ checkedListAll });
  };

  selectItem(e) {
    const { checked } = e.target;
    let collection = [];

    if (checked) {
      collection = this.getAllItems();
    }

    this.setState({
      checkedListAll: collection,
      AllItemsChecked: checked
    });
  };

  getAllItems = () => {
    const { columns } = this.state;
    const collection = [];
    for (const col of columns) {
      for (const item of col.items) {
        collection.push(item.value);
      }
    }
    return collection;
  };

  handleCheckboxClick(e) {
    const { value, checked } = e.target;

    if (checked) {
      const collection = this.getAllItems();
      this.setState(prevState => ({
        checkedListAll: [...prevState.checkedListAll, value],
        AllItemsChecked: collection.length === prevState.checkedListAll.length + 1,
      }));
    } else {
      this.setState(prevState => ({
        checkedListAll: prevState.checkedListAll.filter(item => item !== value),
        AllItemsChecked: false,
      }));
    }
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { columns, checkedListAll, AllItemsChecked } = this.state;
    return (
      <div>
        <h1>Thesaurus of International Trade Terms</h1>
        <p>The International Trade Administration’s (ITA) Thesaurus of International Trade Terms is a controlled and structured list of words and phrases used to tag and index information found on the ITA’s websites and databases. The thesaurus covers all subjects related to international trade and foreign investment with particular emphasis on exporting, trade promotion, market access and enforcement and compliance.</p>

        <div className="center">
          <input type="text" name="queryString" placeholder="Enter search query" value={this.state.queryString} onChange={(event) => this.handleChange(event)}/>
          <Link to={{pathname: `/resultsList`, state: {
            queryString: this.state.queryString,
            typesChecked: this.state.checkedListAll,
          }}}>
            <button>Search</button>
          </Link>
        </div>

        <div className="columns">
          <p className="col-1">Include in search:</p>
          <div id="selectAll">
            <label>
              <Checkbox checked={AllItemsChecked} onClick={this.selectItem.bind(this)} color="primary"/>Select All
            </label>
          </div>

          {columns.map(col => {
            return (
              <Column 
                {...col}
                key={col.name}
                click={this.openModal}
                selectedItems={this.selectedItems.bind(this)}
                AllItemsChecked={AllItemsChecked}
                checkedListAll={checkedListAll}
                handleCheckboxClick={this.handleCheckboxClick}
              />
            );
          })}
        </div>
        <p><b>Are all items selected:</b> {`${AllItemsChecked}`}</p>
        <p><b>Items selected:</b> {`${checkedListAll}`}</p>
      </div>
    );
  }
}

export default withRouter(Thesauri);