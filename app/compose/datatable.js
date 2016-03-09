import ReactDOM from "react-dom";

import DataField from "./datafield";
import DataHeaderField from "./dataheaderfield";

export default React.createClass({
  componentDidUpdate: function(prev_props) {
    if (this.props.merge_data.length > prev_props.merge_data.length) {
      this.reflow_sticky_header();
      this.focus_on_new_row();
    }

    if (this.props.merge_data[0].length > prev_props.merge_data[0].length) {
      this.reflow_sticky_header();
      this.focus_on_new_column();
    }

    if (prev_props.active_index !== this.props.active_index) {
      var row = ReactDOM.findDOMNode(this.refs.selected_row);
      var position = row.offsetTop;
      row.closest('.email-datapanel-content').scrollTop = position - 82;
    }
  },
  enable_sticky_header: function() {
    /* using a jQuery plugin screws with React's Virtual DOM */
    $(ReactDOM.findDOMNode(this)).floatThead({
      position: 'fixed',
      scrollContainer: function($table) {
        return $table.closest('.email-datapanel-content');
      }
    });
  },
  disable_sticky_header: function() {
    $(ReactDOM.findDOMNode(this)).floatThead('destroy');
  },
  reflow_sticky_header: function() {
    $(ReactDOM.findDOMNode(this)).floatThead('reflow');
  },
  is_in_use_column: function(index) {
    return this.props.compose.state.in_use_columns.indexOf(index) != -1
  },
  focus_on_new_row: function() {
    var table = ReactDOM.findDOMNode(this);
    var row = table.getElementsByTagName('tbody')[0].querySelector("tr:last-child");

    var position = row.offsetTop;
    table.closest('.email-datapanel-content').scrollTop = position - 82;

    row.getElementsByTagName('td')[1].focus();
  },
  focus_on_new_column: function() {
    var headers = ReactDOM.findDOMNode(this)
      .parentElement
      .querySelectorAll(".floatThead-table th");

    setTimeout(function() {
      headers[headers.length - 2].focus();
    });
    /* could be nice to vertical scroll too */
  },
  render: function() {
    var active_index = this.props.active_index;
    var self = this;

    return <table>
      <thead>
        <tr>
          <th key="0"></th>
          {this.props.merge_data[0].map(function(heading, i) {
            return <DataHeaderField key={i} i={i} compose={self.props.compose} value={heading} disabled={self.is_in_use_column(i)} focus_cell={self.focus_cell}/>;
          })}
          <th key="last"><svg onClick={this.props.compose.add_column} viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path d="M55.862,26.24v18.52h17.364v10.386H55.862V73.76h-11.82V55.146H26.773V44.76h17.269V26.24H55.862z"/></svg></th>
        </tr>
      </thead>

      <tbody>
        {this.props.merge_data.slice(1).map(function(row, i) {
          return <tr className={active_index == i ? "selected" : ""} ref={active_index == i ? "selected_row" : null} key={i}>
            <td key={i + "-first"}>{i + 1}</td>
            {row.map(function(element, j) {
              return <DataField key={i + "-" + j} compose={self.props.compose} i={i + 1} j={j} value={element} focus_cell={self.focus_cell}/>;
            })}
            <td key="last" />
          </tr>;
        })}
      </tbody>
    </table>;
  }
});
