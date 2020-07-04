import React, { Component } from "react"

class AddWorkerForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      url: "",
      permission: "",
      pin: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    this.props.onSubmit(this.state.name, this.state.url, this.state.permission, this.state.pin, event)
    this.setState({name: "", url: "", permission: "", pin: ""})
  }
  render() {
    return (
      <form className="upload-form" onSubmit={this.handleSubmit}>
        <input type="text" name="name" value={this.state.name} placeholder="Enter worker name" onChange={this.handleChange}/>
        <input type="text" name="url" value={this.state.url} placeholder="Enter url" onChange={this.handleChange}/>
        <input type="text" name="pin" value={this.state.pin} placeholder="Enter pin" onChange={this.handleChange}/>
        <label>User permission</label>
        <select value={this.state.permission} onChange={this.handleChange}>
          <option value="R">Read</option>
          <option value="RW">Read-Write</option>
          <option value="RWX">Read-Write-Delete</option>
        </select>
        <input type="submit" value="Add"/>
      </form>
    )
  }
}

export default AddWorkerForm
