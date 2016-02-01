import React from "react";
import ContentEditable from "./contenteditable";

export default React.createClass({
  getInitialState: function(){
    return {html: "<br/><br/><br/>—<br/><strong>David Cooper</strong><br/>"};
  },
  handleChange: function(e){
    this.setState({html: e.target.value});
  },
  render: function() {
    return <ContentEditable
      className="email-content"
      html={this.state.html}
      onUpdate={this.props.textFieldUpdate} />
  }
});
