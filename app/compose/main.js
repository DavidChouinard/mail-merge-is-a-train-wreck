import React from "react";
import ReactDOM from "react-dom";

import ComposeField from "./field";
import ComposeSubject from "./subject";
import ComposeBody from "./body";

export default React.createClass({
  componentDidUpdate: function(prevProp) {
    if (prevProp.active_data != this.props.active_data) {
      this.process_chicklets.call(this);
    }
  },
  textFieldUpdate: function() {
    this.process_chicklets.call(this);
  },
  process_chicklets: function(chicklets) {
    // no virtual DOM here
    var chicklets = ReactDOM.findDOMNode(this).getElementsByClassName("chicklet");

    var columns = [];
    for (var i = 0; i < chicklets.length; i++) {
      var column = parseInt(chicklets[i].getAttribute("data-column"), 10);

      chicklets[i].textContent = this.props.active_data[column];
      if (columns.indexOf(column) == -1) {
        columns.push(column)
      }
      chicklets[i].setAttribute("contentEditable", "false");
      //chicklets[i].setAttribute("draggable", "true");
    }
    this.props.update_active_columns(columns);
  },
  render: function() {
    return <div className="email-main email-shell">
      <ComposeField name="To" textFieldUpdate={this.textFieldUpdate}/>
      <ComposeField name="CC" textFieldUpdate={this.textFieldUpdate} />
      <ComposeSubject textFieldUpdate={this.textFieldUpdate}/>
      <ComposeBody update_active_columns={this.props.update_active_columns} textFieldUpdate={this.textFieldUpdate}/>
    </div>;
  }
});
