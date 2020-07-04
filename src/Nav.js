import React, { Component } from "react"
import AuthWorker from "./AuthWorker"
import CloudIcon from "./resources/filter_drama-24px.svg"

class Nav extends Component {
  constructor() {
    super()
    this.handleReload = this.handleReload.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }
  handleReload() {
    window.location.reload()
  }
  handleAuth(email, key) {
    this.props.onAuth(email, key)
  }
  render() {
    return (
      <div className="nav">
        <div className="nav-button" onClick={this.handleReload}>
          <img src={CloudIcon}/>
          <h3 className="nav-button-title">Homebase</h3>
        </div>
        <AuthWorker onAuth={this.handleAuth}/>
      </div>
    )
  }
}

export default Nav
