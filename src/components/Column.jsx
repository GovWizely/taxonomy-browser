import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";
// import Checkbox from './Checkbox';

class Column extends Component {
  render() {
    const {
      items,
      name,
      checkedListAll,
    } = this.props;

    const getItems = items.map(item => {
      return item;
    });

    return (
      <div className={name}>
        {getItems.map(item => {
          return (
            <div key={item.value}>
              <Checkbox
                item={item}
                value={item.value}
                checked={checkedListAll.includes(item.value)}
                onChange={this.props.handleCheckboxClick}
                color="primary"
              /><a href={item.link}>{item.name}</a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Column;