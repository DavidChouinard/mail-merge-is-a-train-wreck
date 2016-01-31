import React from "react";
import ContentEditable from "./contenteditable";

export default React.createClass({
  getInitialState: function(){
    return {html: "Hi ,<br/><br/>Thank you for attending our fundraising event. Your company's support means a lot.<br/><br/>As you’ve heard from Richard Moore yesterday, we’re expanding our community programs to reach at-risk youth. This is a big step for the program and we need your help.<br/><br/>If you’d like to make a gift, you can do so on the website. Thank you for your support.<br/><br/>—<br/><strong>David Chouinard</strong><br/>Director of Fundraising"};
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
