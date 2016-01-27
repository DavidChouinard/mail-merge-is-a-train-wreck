import React from "react";
import DataTable from "./datatable";
import Dropzone from 'react-dropzone';

import Arrow from "./arrow";

export default React.createClass({
  getInitialState: function() {
    return {
      loading: false
    }
  },
  componentDidUpdate: function(prev_props, prev_state) {
    /* jQuery sticky header doesn't work well with CSS animations: make sure it's disabled before animating */
    if ('datatable' in this.refs) {
      if (prev_props.mail_merge_mode && !this.props.mail_merge_mode) {
        this.refs.datatable.disable_sticky_header();
      } else if(!prev_props.mail_merge_mode && this.props.mail_merge_mode) {
        setTimeout(this.refs.datatable.enable_sticky_header, 250);
      }
    }
  },
  onDrop: function (files) {
    var self = this;

    this.setState({loading: true})

    var reader = new FileReader();

    reader.onload = function(event) {
      var contents = event.target.result;
      var data = contents
        .split('\n')
        .map(function(l) { return l.split(','); });

      setTimeout(function() {   /* simulate loading time */
        self.setState({loading: false})
        self.props.update_merge_data(data);
      }, 1000);
    };

    reader.onerror = function(event) {
      /* TODO */
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(files[0]);
  },
  goToFirst: function() {
    this.props.update_active_index(0);
  },
  goToPrevious: function() {
    this.props.update_active_index(this.props.active_index - 1);
  },
  goToNext: function() {
    this.props.update_active_index(this.props.active_index + 1);
  },
  goToLast: function() {
    this.props.update_active_index(this.props.merge_data.length - 2);
  },
  render: function() {
    var active_index = this.props.active_index;
    return <div className="email-datapanel">
      <div className="email-datapanel-head">
        {this.props.merge_data === null ?
          <h4>Upload email address file</h4>
          :
          <span>
            <span className="email-datapanel-head-arrows">

              <Arrow type="first" disabled={active_index == 0} onClick={this.goToFirst}/><Arrow type="previous" disabled={active_index == 0} onClick={this.goToPrevious}/><span className="email-datapanel-head-arrows-count">{active_index + 1}</span><Arrow type="next" disabled={active_index == this.props.merge_data.length - 2} onClick={this.goToNext}/><Arrow type="last" disabled={active_index == this.props.merge_data.length - 2} onClick={this.goToLast}/>
            </span>
            <span className="email-datapanel-head-total">of {this.props.merge_data.length - 1} recipients</span>
          </span>
        }
      </div>

      {this.props.merge_data === null ?
        /* TODO: add `accept` parameter */
        <Dropzone onDrop={this.onDrop} ref="dropzone" className="email-datapanel-prompt" activeClassName="active" style={{}}>
          <div>
            {this.state.loading ?
              <img src="/images/loading.gif" alt="Loading" className="email-datapanel-prompt-loading" />
              :
              <div>
                <svg viewBox="0 0 96 120" x="0px" y="0px"><path d="M51 96h-38c-1.104 0-2-0.9-2-2v-69.672c0-0.492 0.18-0.964 0.508-1.332l20-22.328c0.38-0.424 0.92-0.668 1.492-0.668h48c1.1 0 2 0.896 2 2v58c0 1.1-0.9 2-2 2s-2-0.9-2-2v-56h-45.104l-18.896 21.092v66.908h36c1.1 0 2 0.9 2 2s-0.9 2-2 2z"/><path d="M33 28h-18c-1.104 0-2-0.896-2-2s0.896-2 2-2h16v-20c0-1.104 0.896-2 2-2s2 0.896 2 2v22c0 1.104-0.896 2-2 2z" /><path d="M73 94c-1.1 0-2-0.9-2-2v-20c0-1.1 0.9-2 2-2s2 0.9 2 2v20c0 1.1-0.9 2-2 2z" /><path d="M83 84h-20c-1.1 0-2-0.9-2-2s0.9-2 2-2h20c1.1 0 2 0.9 2 2s-0.9 2-2 2z"/></svg>
                <div className="email-datapanel-supported">CSV, TSV or Excel</div>
              </div>
            }
          </div>
        </Dropzone>
        :
        <div className="email-datapanel-content">
          <DataTable ref="datatable" merge_data={this.props.merge_data} active_index={this.props.active_index} active_columns={this.props.active_columns}/>
        </div>
      }
    </div>;
  }
});
