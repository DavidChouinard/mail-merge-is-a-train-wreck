import React from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";

import Chicklet from "./chicklet";

export default React.createClass({
  getInitialState: function() {
    return { is_focused: this.props.value == "" };
  },
  componentDidUpdate: function(prev_props, prev_state) {
    if (prev_state.is_focused !== this.state.is_focused && this.state.is_focused) {
      ReactDOM.findDOMNode(this).focus();
    }
  },
  onClick: function(event) {
    this.setState({is_focused: true});
  },
  onBlur: function(event) {
    this.setState({is_focused: false});
  },
  onInput: function(event) {
    var value = ReactDOM.findDOMNode(this).innerHTML;

    var merge_data = update(this.props.compose.state.merge_data, {
      0: {[this.props.i]: {$set: value}}
    });

    this.props.compose.setState({merge_data: merge_data});
  },
  onKeyDown: function(event) {
    if (event.keyCode == 13) {  /* Enter key */
      event.preventDefault();
      var cell = ReactDOM.findDOMNode(this);
      cell.blur();

      // if the cell below is empty (i.e. newly created), set the focus there
      var rows = cell.closest('.email-datapanel')
        .querySelectorAll(".email-datapanel-content > table > tbody > tr");

      var cell_below = rows[0].getElementsByTagName('td')[this.props.i + 1];
      if (cell_below.innerHTML == "") {
        cell_below.focus();
      }
    }
  },
  render: function() {
    if (this.state.is_focused) {
      return <th onInput={this.onInput} onBlur={this.onBlur} onClick={this.onClick} onKeyDown={this.onKeyDown} contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.value}} />
    } else {
      return <th onClick={this.onClick}>
        <Chicklet value={this.props.value} column={this.props.i} disabled={this.props.disabled}/>
      </th>
    }
  }
});
