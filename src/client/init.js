'use strict'
console.log('lele');


var React = require('react'),
  ReactDOM = require('react-dom'),
  Codemirror = require('react-codemirror');


require('codemirror/mode/sql/sql');
require('codemirror/lib/codemirror.css');
var App = React.createClass({
  getInitialState: function() {
    return {
      code: ""
    };
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },
  render: function() {
    var options = {
      lineNumbers: true
    };
    return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
