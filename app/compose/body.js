import React from "react";
import ContentEditable from "./contenteditable";

export default React.createClass({
  getInitialState: function(){
    //Walt Disney Imagineering<br/>
    return {html: "<br/><br/><br/>—<br/><strong>David Chouinard</strong><br/>"};
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
