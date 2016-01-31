import React from "react";
import ReactDOMServer from "react-dom/server";
import update from "react-addons-update";

import Chicklet from "./chicklet";

export default React.createClass({
  getInitialState: function() {
    return { is_focused: false };
  },
  onInput: function(event) {
    //var i = parseInt(this.props.i, 10);
    //this.props.compose.state.merge_data[0][i] = event.target.value;
    //this.props.compose.setState({merge_data: this.props.compose.state.merge_data});
    //console.log(this.props.compose.state);
  },
  onFocus: function(event) {
    this.setState({is_focused: true});
  },
  onBlur: function(event) {
    this.setState({is_focused: false});
  },
  onClick: function(event) {
    console.log('click');
  },
  render: function() {
    var html = ReactDOMServer.renderToStaticMarkup(<Chicklet value={this.props.value} column={this.props.i} disabled={this.props.disabled}/>);
    //return <th onInput={this.onInput} onFocus={this.onFocus} onBlur={this.onBlur} contentEditable="true" dangerouslySetInnerHTML={{__html: html}} />

    return <th onInput={this.onInput} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick}>
      {this.state.is_focused || this.props.value == "" ?
        this.props.value
      :
        <Chicklet value={this.props.value} column={this.props.i} disabled={this.props.disabled}/>
      }
    </th>
  }
});
