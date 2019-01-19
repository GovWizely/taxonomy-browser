import React, { Component } from "react";
import Column from './Column';

class Thesauri extends Component {
  constructor(props) {
    super(props)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

    this.state = {
      columns: [
        {
          name: "col-2",
          items: [
            { name: "Trade Topics", value: "trade_topics" },
            { name: "Industries", value: "industries" },
            { name: "Countries", value: "countries" },
          ]
        },
        {
          name: "col-3",
          items: [
            { name: "World Regions", value: "world_regions" },
            { name: "Trade Regions", value: "trade_regions" },
            { name: "US Trade Initiatives", value: "US_trade_initiatives" },
          ]
        }
      ],
      checkedListAll: [],
      AllItemsChecked: false
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
  }

  render() {
    const { columns, checkedListAll, AllItemsChecked } = this.state;

    return (
      <div>
        <h1>Thesaurus of International Trade Terms</h1>
        <p>The International Trade Administration’s (ITA) Thesaurus of International Trade Terms is a controlled and structured list of words and phrases used to tag and index information found on the ITA’s websites and databases. The thesaurus covers all subjects related to international trade and foreign investment with particular emphasis on exporting, trade promotion, market access and enforcement and compliance.</p>
        <div className="col-1">
          <label>
            <input type="checkbox" checked={AllItemsChecked} onClick={this.selectItem.bind(this)}/>Select All
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
        <p>Are all items selected: {JSON.stringify(AllItemsChecked, null, 2)}</p>
        <p>Items selected: {JSON.stringify(checkedListAll, null, 2)}</p>
      </div>
    );
  }
}

export default Thesauri;