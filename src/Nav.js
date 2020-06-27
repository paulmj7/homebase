import React, { Component } from "react"
import AuthWorker from "./AuthWorker"
import CloudIcon from "./resources/filter_drama-24px.svg"

class Nav extends Component {
  constructor() {
    super()
    this.handleReload = this.handleReload.bind(this)
  }
  handleReload() {
    window.location.reload()
  }
  render() {
    return (
      <div className="nav">
        <div className="nav-button" onClick={this.handleReload}>
          <img src={CloudIcon}/>
          <h3 className="nav-button-title">Homebase</h3>
        </div>
        <AuthWorker/>
      </div>
    )
  }
}

export default Nav
