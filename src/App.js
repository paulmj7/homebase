import React, { Component } from "react"
import "./App.css"
import Nav from "./Nav"
import HermesWorker from "./HermesWorker"
import Workers from "./Workers"

class App extends Component {
  constructor() {
    super()
    this.state = {
      url: "http://localhost:5000"
    }
    this.handleWorkerSelect = this.handleWorkerSelect.bind(this)
  }
  handleWorkerSelect(url) {
    this.setState({ url })
  }
  render() {
    return (
      <div className="App">
        <Nav/>
        <Workers handleClick={this.handleWorkerSelect}/>
        <HermesWorker url={this.state.url}/>
        <p className="footer">Homebase: Prototype</p>
      </div>
    )
  }
}

export default App
