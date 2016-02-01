import React from "react";
import DataTable from "./datatable";
import Dropzone from 'react-dropzone';

import Arrow from "./arrow";

export default React.createClass({
  getInitialState: function() {
    return { dropzone_visible: true }
  },
  componentDidUpdate: function(prev_props, prev_state) {
    var self = this;

    /* jQuery sticky header doesn't work well with CSS animations: make sure it's disabled before animating */
    if (prev_props.mail_merge_mode && !this.props.mail_merge_mode) {
      if ('datatable' in this.refs) {
        this.refs.datatable.disable_sticky_header();
      }
      this.setState({dropzone_visible: false});
    } else if(!prev_props.mail_merge_mode && this.props.mail_merge_mode) {
      setTimeout(function() {
        if ('datatable' in self.refs) {
          self.refs.datatable.enable_sticky_header();
        }
        self.setState({dropzone_visible: true})
      }, 200);
    } else if (prev_props.merge_data != this.props.merge_data) {
      this.refs.datatable.enable_sticky_header();
    }
  },
  onDrop: function (files) {
    var self = this;

    var reader = new FileReader();

    reader.onload = function(event) {
      var contents = event.target.result;
      var data = contents
        .split('\n')
        .map(function(l) { return l.split(','); });

      self.props.compose.update_merge_data(data);
      self.refs.datatable.enable_sticky_header();
    };

    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(files[0]);
  },
  goToFirst: function() {
    this.props.compose.update_active_index(0);
  },
  goToPrevious: function() {
    this.props.compose.update_active_index(this.props.compose.state.active_index - 1);
  },
  goToNext: function() {
    this.props.compose.update_active_index(this.props.compose.state.active_index + 1);
  },
  goToLast: function() {
    this.props.compose.update_active_index(this.props.compose.state.merge_data.length - 2);
  },
  render: function() {
    var active_index = this.props.compose.state.active_index;

    return <div className="email-datapanel">
      <div className="email-datapanel-head">
        <span>
          <span className="email-datapanel-head-arrows">
            <Arrow type="first" disabled={active_index == 0} onClick={this.goToFirst}/><Arrow type="previous" disabled={active_index == 0} onClick={this.goToPrevious}/><span className="email-datapanel-head-arrows-count">{active_index + 1}</span><Arrow type="next" disabled={active_index == this.props.compose.state.merge_data.length - 2} onClick={this.goToNext}/><Arrow type="last" disabled={active_index == this.props.compose.state.merge_data.length - 2} onClick={this.goToLast}/>
          </span>
          <span className="email-datapanel-head-total">of {this.props.compose.state.merge_data.length - 1} recipients</span>
        </span>
      </div>

      <Dropzone onDrop={this.onDrop} ref="dropzone" accept="text/csv" disableClick={this.props.compose.merge_data !== null} className="email-datapanel-content" activeClassName="active">
        <DataTable ref="datatable" compose={this.props.compose} mail_merge_mode={this.props.mail_merge_mode} merge_data={this.props.merge_data} active_index={this.props.active_index}/>
      </Dropzone>
    </div>;
  }
});
