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

      if (this.props.i >= rows.length) {
        this.props.compose.add_row();
      } else {
        var cell_below = rows[this.props.i].getElementsByTagName('td')[this.props.j + 1];
        if (cell_below.innerHTML == "") {
          cell_below.focus();
        }
      }
    }
  },
  render: function() {
    return <td onInput={this.onInput} onKeyDown={this.onKeyDown} contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.value}} />;
  }
});
