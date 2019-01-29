import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";
import { withRouter } from 'react-router-dom'; 

class Checkboxes extends Component {

  render() {

    const {
      items,
      name,
      checkedListAll,
      handleCheckboxClick,
    } = this.props;

    const getItems = items.map(item => {
      return item;
    });

    return (
      <div className={name}>
        {getItems.map(item => {
          return (
            <div key={item.value}>
              <label>
                <Checkbox
                  item={item}
                  value={item.value}
                  checked={checkedListAll.includes(item.value)}
                  onChange={handleCheckboxClick}
                  color="primary"
                />{item.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Checkboxes);