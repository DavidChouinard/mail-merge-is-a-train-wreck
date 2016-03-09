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
    e.dataTransfer.setData('text/html', '<span class="chicklet" data-column="' + this.props.column + '">' + this.props.value + '</span>');
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

        {this.props.value}
      </span>
  }
});
