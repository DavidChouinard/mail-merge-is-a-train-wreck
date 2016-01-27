import React from "react";

import ContentEditable from "./contenteditable";

export default React.createClass({
  render: function() {
    return <div className="email-field email-subject">
      <ContentEditable className="email-field-input" id="email-subject-input" onUpdate={this.props.textFieldUpdate}/>
    </div>;
  }
});
