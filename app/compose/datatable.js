import React from "react";
import ReactDOM from "react-dom";

import DataField from "./datafield";
import DataHeaderField from "./dataheaderfield";

export default React.createClass({
  componentDidUpdate: function(prev_props) {
    if (prev_props.active_index !== this.props.compose.state.active_index) {
      var row = ReactDOM.findDOMNode(this.refs.selected_row);
      var position = row.offsetTop;
      // TODO
      //row.closest('.email-datapanel-content').scrollTop = position - 82;
    }
  },
  enable_sticky_header: function() {
    /* using a jQuery plugin screws with React's Virtual DOM */
    //$(ReactDOM.findDOMNode(this)).floatThead();
  },
  disable_sticky_header: function() {
    //$(ReactDOM.findDOMNode(this)).floatThead('destroy');
  },
  reflow_sticky_header: function() {
    //$(ReactDOM.findDOMNode(this)).floatThead('reflow');
  },
  is_in_use_column: function(index) {
    return this.props.compose.state.in_use_columns.indexOf(index) != -1
  },
  random_key: function() {
    return Math.random().toString(36).slice(2);
  },
  render: function() {
    var active_index = this.props.compose.state.active_index;
    var self = this;

    return <table>
      <thead>
        <tr>
          <th key="0"></th>
          {this.props.compose.state.merge_data[0].map(function(heading, i) {
            return <DataHeaderField key={i} i={i} compose={self.props.compose} value={heading} disabled={self.is_in_use_column(i)}/>;
          })}
          <th key="last"><svg onClick={this.props.compose.add_column} viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path d="M55.862,26.24v18.52h17.364v10.386H55.862V73.76h-11.82V55.146H26.773V44.76h17.269V26.24H55.862z"/></svg></th>
        </tr>
      </thead>

      <tbody>
        {this.props.compose.state.merge_data.slice(1).map(function(row, i) {
          return <tr className={active_index == i ? "selected" : ""} ref={active_index == i ? "selected_row" : null} key={i}>
            <td key={i + "-first"}>{i + 1}</td>
            {row.map(function(element, j) {
              return <DataField key={i + "-" + j} compose={self.props.compose} i={i + 1} j={j} value={element} />;
            })}
            <td key="last" />
          </tr>;
        })}
      </tbody>
    </table>;
  }
});
