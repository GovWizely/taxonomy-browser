import React, { Component } from "react";
// import { Checkbox } from "@material-ui/core";
import Checkbox from './Checkbox';

class Column extends Component {
  render() {
    const {
      items,
      name,
      selectedItems,
      // AllItemsChecked,
      checkedListAll,
    } = this.props;

    const getItems = items.map(item => {
      return item;
    });

    return (
      <div className={name}>
        <ul>
          {getItems.map(item => {
            return (
              <li key={item.value}>
                <Checkbox
                  item={item}
                  selectedItems={selectedItems}
                  isChecked={checkedListAll.includes(item.value)}
                  handleCheckboxClick={this.props.handleCheckboxClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Column;