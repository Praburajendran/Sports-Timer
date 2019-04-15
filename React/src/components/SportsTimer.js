import React, { Component } from "react";

class Sports extends Component {
  render() {
    const { response } = this.props;
    return ( 
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Athlete Name: {response} °F
            </p>
          : <p>Loading...</p>} 
      </div>
    );
  }
}

export default Sports;