import React from "react";

export default React.createClass({
  render: function() {
    return <div className="email-actions email-shell">
        <div className={"email-actions-send " + (this.props.mail_merge_mode && this.props.merge_data === null ? 'disabled' : '')} onClick={this.props.send_emails}>
          Send{this.props.mail_merge_mode && this.props.merge_data !== null ? ' ' + (this.props.merge_data.length - 1) + ' emails' : ''}
        </div>
        <div className="email-actions-mass" onClick={this.props.toggle_mail_merge_mode}>
          <svg viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path d="M48.417,11.167l-36.5,19c-1.5,0.833-1.5,3.167,0,4l36.5,19c1,0.5,2.166,0.5,3.166,0l36.501-19c1.5-0.833,1.5-3.167,0-4l-36.667-19C50.417,10.667,49.417,10.667,48.417,11.167z"/><path d="M87.918,47.833l-6.834-3.5c-0.332-0.166-0.832-0.166-1.332,0L53.583,58c-1.166,0.667-2.5,0.833-3.666,0.833c-1.333,0-2.5-0.333-3.667-0.833L20.083,44.333c-0.333-0.166-0.833-0.166-1.333,0l-6.833,3.5c-1.5,0.834-1.5,3.167,0,4l36.5,19.001c1,0.5,2.166,0.5,3.166,0l36.501-19.001C89.418,51,89.418,48.667,87.918,47.833z"/><path d="M87.918,65.834l-6.834-3.5c-0.332-0.168-0.832-0.168-1.332,0L53.583,76c-1.166,0.666-2.5,0.834-3.666,0.834c-1.333,0-2.5-0.334-3.667-0.834L20.083,62.334c-0.333-0.168-0.833-0.168-1.333,0l-6.833,3.5c-1.5,0.832-1.5,3.166,0,4l36.5,19c1,0.5,2.166,0.5,3.166,0l36.501-19C89.418,69,89.418,66.666,87.918,65.834z"/></svg>
          Mass email
        </div>
      </div>;
  }
});
