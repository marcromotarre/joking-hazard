import React, { Component } from "react";

import { signOut } from "../firebase";

class UserInfo extends Component {
  render() {
    return (
      <div className="UserInfo">
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}

export default UserInfo;
