import React, { Component } from "react"
import "./App.css"
import Nav from "./Nav"
import HermesWorker from "./HermesWorker"
import Workers from "./Workers"

class App extends Component {
  constructor() {
    super()
    this.state = {
      emailAddress: "",
      secretKey: "",
      url: ""
    }
    this.handleWorkerSelect = this.handleWorkerSelect.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }
  handleWorkerSelect(url) {
    this.setState({ url })
  }
  handleAuth(emailAddress, secretKey) {
    this.setState({ emailAddress, secretKey })
  }
  render() {
    return (
      <div className="App">
        <Nav onAuth={this.handleAuth}/>
        <Workers emailAddress={this.state.emailAddress} secretKey={this.state.secretKey} onClick={this.handleWorkerSelect}/>
        <HermesWorker url={this.state.url}/>
        <p className="footer">Homebase: Prototype</p>
      </div>
    )
  }
}

export default App
