import React from "react";

export default React.createClass({
  getInitialState: function() {
    return { disabled: false };
  },
  onMouseDown: function(e) {
    // hijacks native drag-n-drop behavior to interface with text boxes.
    // only works on Chrome.
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNode(e.target);
    sel.removeAllRanges();
    sel.addRange(range);
  },
  onDragStart: function(e) {
    this.setState({disabled: true})
    e.dataTransfer.setData('text/html', '<span class="chicklet" data-column="' + this.props.column + '">' + this.props.heading + '</span>');
  },
  onDragEnd: function(e) {
    this.setState({disabled: false})
  },
  render: function() {
    return <span
      className={"chicklet " + this.props.className}
      draggable="true"
      style={this.state.disabled || this.props.disabled ? {opacity: 0.5} : null}
      data-column={this.props.column}
      onMouseDown={this.onMouseDown}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}>
        <svg viewBox="0 0 60 100" enable-background="new 0 0 60 100">
          <rect x="9" y="8.644" width="15.689" height="15.689"/>
          <rect x="9" y="42.061" width="15.689" height="15.689"/>
          <rect x="9" y="75.478" width="15.689" height="15.689"/>
          <rect x="35.311" y="8.644" width="15.689" height="15.689"/>
          <rect x="35.311" y="42.061" width="15.689" height="15.689"/>
          <rect x="35.311" y="75.478" width="15.689" height="15.689"/>
        </svg>

        {this.props.heading}
      </span>
  }
        //<svg viewBox="0 0 16 20" x="0px" y="0px"><path d="M8 0l-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l2 2 1 1 1-1 2-2h-2v-4h4v2l3-3-3-3v2h-4v-4h2l-3-3z"/></svg>
});
