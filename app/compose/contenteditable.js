import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  // wish React had better ways to deal with contentEditable
  render: function(){
    return <div className={this.props.className}
      id={this.props.id}
      onInput={this.props.onUpdate}
      onBlur={this.props.onUpdate}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  },
});
