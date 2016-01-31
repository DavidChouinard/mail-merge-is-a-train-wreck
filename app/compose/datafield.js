import React from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";

export default React.createClass({
  onInput: function(event) {
    var i = parseInt(this.props.i, 10);
    var j = parseInt(this.props.j, 10);
    var value = ReactDOM.findDOMNode(this).innerHTML;

    var merge_data = update(this.props.compose.state.merge_data, {
      [i]: {[j]: {$set: value}}
    });

    this.props.compose.setState({merge_data: merge_data});
  },
  onKeyDown: function(event) {
    if (event.keyCode == 13) {  /* Enter key */
      event.preventDefault();

      var cell = ReactDOM.findDOMNode(this);
      cell.blur();

      var rows = cell.closest('table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

      var i = this.props.i;
      var j = this.props.j;

      if (i < rows.length) {
      } else {
        this.props.compose.add_row();
      }

      var row = rows[i];

      var cells = row.getElementsByTagName('td');

      // if the cell direclty under is empty, focus on that one
      // else, if the first cell is empty, focus on that one
      // else, don't focus on anything
      if (cells[j + 1].innerHTML == "") {
        cells[j + 1].focus();
      } else if (cells[1].innerHTML == "") {
        cells[1].focus();
      }

        //var position = row.offsetTop;
        //table.closest('.email-datapanel-content').scrollTop = position - 82;
      //this.props.focus_cell(10);

    }
  },
  render: function() {
    return <td onInput={this.onInput} onKeyDown={this.onKeyDown} contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.value}} />;
  }
});
