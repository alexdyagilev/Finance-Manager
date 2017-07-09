// Include React
var React = require("react");

// Create the Transaction History Component
var THistory = React.createClass({

  // getInitialState: function() {
  //   return {
  //     clicks: 0,
  //     clickID: "Main"
  //   };
  // },

  // Here we render the function

  render: function() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1>Transaction History</h1>
          </div>
          <div className="panel-body">
            <p>History goes here</p>
          </div>
        </div>
      </div>
    );
  }

});

// Export the component back for use in other files
module.exports = THistory;
