import React from "react";

export default React.createClass({
  render: function() {
    return <div className="loadingoverlay">
      <img src="/images/loading-bar.gif" alt="Sending emails" />
    </div>;
  }
});
