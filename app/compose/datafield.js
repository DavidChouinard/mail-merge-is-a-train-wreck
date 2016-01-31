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
    console.log('key up');
    if (event.keyCode == 13) {  /* Enter key */
      event.preventDefault();
      this.props.compose.add_row();
      /* TODO: focus next row and scroll down */
    }
  },
  render: function() {
    return <td onInput={this.onInput} onKeyDown={this.onKeyDown} contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.value}} />;
  }
});
