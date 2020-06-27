import React, { Component } from "react"

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      firstName: ""
      lastName: ""
      username: ""
      password: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.firstName} onChange={this.handleChange}/>
        <input type="text" value={this.state.lastName} onChange={this.handleChange}/>
        <input type="text" value={this.state.username} onChange={this.handleChange}/>
        <input type="password" value={this.state.password} onChange={this.handleChange}/>
        <input type="submit" value="Sign Up"/>
      </form>
    )
  }
}

export default SignUp
