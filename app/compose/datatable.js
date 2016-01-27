import React from "react";
import ReactDOM from "react-dom";

import Chicklet from "./chicklet";

export default React.createClass({
  componentDidMount: function() {
    this.enable_sticky_header();
  },
  componentDidUpdate: function(prev_props) {
    if (prev_props.active_index != this.props.active_index) {
      var row = ReactDOM.findDOMNode(this.refs.selected_row);
      var position = row.offsetTop;
      row.closest('.email-datapanel-content').scrollTop = position - 82;
    }
  },
  enable_sticky_header: function() {
    /* using a jQuery plugin screws with React's Virtual DOM */
    $(ReactDOM.findDOMNode(this)).floatThead();
  },
  disable_sticky_header: function() {
    $(ReactDOM.findDOMNode(this)).floatThead('destroy');
  },
  is_active_column: function(index) {
    return this.props.active_columns.indexOf(index) != -1
  },
  render: function() {
    var active_index = this.props.active_index;
    var self = this;

    return <table>
      <thead>
        <tr>
          <th></th>
          {this.props.merge_data[0].map(function(heading, i) {
            return <th key={"heading-" + i}><Chicklet heading={heading} column={i} disabled={self.is_active_column(i)}/></th>;
          })}
        </tr>
      </thead>

      <tbody>
        {this.props.merge_data.slice(1).map(function(row, i) {
          return <tr className={active_index == i ? "selected" : ""} ref={active_index == i ? "selected_row" : null} key={"row-" + i}>
            <td key={"leader-" + i}>{i + 1}</td>
            {row.map(function(element, j) {
              return <td key={element}>{element}</td>;
            })}
          </tr>;
        })}
      </tbody>
    </table>;
  }
});
