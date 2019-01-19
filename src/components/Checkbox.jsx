import React, {Component} from 'react';

class Checkbox extends Component {
  render() {
    const { item, isChecked } = this.props;

    return (
      <label>
        <input 
          type="checkbox"
          value={item.value}
          checked={isChecked}
          onChange={this.props.handleCheckboxClick}
        />
        {item.name}
      </label>
    );
  }
}

export default Checkbox;