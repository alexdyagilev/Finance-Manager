// Include React
var React = require("react");

var Main = React.createClass({

  // getInitialState: function() {
  //   return {
  //     bankAmount: 0,
  //     cashAmount: 0
  //   };
  // },

  // Here we render the function
  render: function() {
      return (
        <div>
          <h1 className="start-h1">Welcome to Finance Manager! This will allow you to track changes to your finances. </h1>
          <h1 className="start-h1">Use the links above to navigate and use the features.</h1>
        </div>
    );
  }

});

// Export the component back for use in other files

module.exports = Main;
