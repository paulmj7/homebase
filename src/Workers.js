import React, { Component } from "react"
import AddWorkerForm from "./AddWorkerForm"

class Workers extends Component {
  constructor() {
    super()
    this.state = {
      workers: [],
      emailAddress: "",
      secretKey: "",
      clicked: false
    }
    
    this.handleToggle = this.handleToggle.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  componentDidMount() {
    if (!this.props.emailAddress) {
      return
    }
    fetch("http://localhost:3000/workers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "email_address": this.props.emailAddress, "secret_key": this.props.secretKey })
    }).then(res => res.json())
    .then(res => {
      if (res.message.localeCompare("nil") === 0) {
        return
      }
      this.setState({ workers: res.worker })
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.emailAddress !== this.props.emailAddress) {
      this.setState({ emailAddress: this.props.emailAddress})
    }
    if (this.state.secretKey !== this.props.secretKey) {
      this.setState({ secretKey: this.props.secretKey })
    }
    if (prevState.emailAddress !== this.state.emailAddress) {
      this.componentDidMount()
    }
    if (prevState.secretKey !== this.state.secretKey) {
      this.componentDidMount()
    }
  }
  handleToggle() {
    if (this.state.clicked) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true })
    }
  }
  handleAdd(name, url, permission, pin, event) {
    event.preventDefault()
    fetch("http://localhost:3000/workers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "name": name, "url": url, "permission": permission, "pin": pin, "user": this.state.emailAddress })
    }).then(() => {
      this.setState({ clicked: false })
      this.componentDidMount()
    })
  }
  render() {
    const workers = this.state.workers.map((worker) => {
      console.log(worker.name)
      console.log("url: " + worker.url)
      return <button className="worker-list-item" onClick={() => this.props.onClick(worker.url)}>{worker.name}</button>
    })
    return (
      <div className="workers">
        <ul className="worker-list">
          {workers}
          <button className="worker-list-item" onClick={this.handleToggle}>Add Worker</button>
        </ul>
        {this.state.clicked &&
          <AddWorkerForm onSubmit={this.handleAdd}/>
        }
      </div>
    )
  }
}

export default Workers
