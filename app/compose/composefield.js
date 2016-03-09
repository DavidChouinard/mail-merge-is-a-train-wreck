import ContentEditable from "./contenteditable";

export default React.createClass({
  render: function() {
    return <div className="email-field">
      <span className="email-field-label">{this.props.name}</span>
      <ContentEditable className="email-field-input" id={"email-" + this.props.name.toLowerCase() + "-input"} onUpdate={this.props.textFieldUpdate} />
    </div>;
  }
});
