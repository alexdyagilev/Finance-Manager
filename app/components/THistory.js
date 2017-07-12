// Include React
var React = require("react");


function Check(){
    if(localStorage.getItem("history")==1){
      return(
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1>Transaction History</h1>
          </div>
          <div className="panel-body">
            <p>History goes here</p>
          </div>
        </div>
      );
      localStorage.setItem("history",0);
    }
    else{
      return null;
    }
  }
// Create the Transaction History Component
var THistory = React.createClass({

  // getInitialState: function() {
  //   return {
  //     clicks: 0,
  //     clickID: "Main"
  //   };
  // },

  // Here we render the function
  // return (
      
  //   );

  

  render: function() {
      return (
        <div>
          <Check />
        </div>
    );
  }

});

// Export the component back for use in other files

module.exports = THistory;
