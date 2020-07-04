import React, { Component } from "react"

class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      clicked: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password, event)
    this.setState({ firstName: "", lastName: "", emailAddress: "", password: "", clicked: false })
  }
  handleToggle() {
    if (this.state.clicked) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true })
    }
  }
  render() {
    return (
      <div>
        {this.state.clicked
          ? <form className="register-form" onSubmit={this.handleSubmit}>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
              <input type="email" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange}/>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
              <input type="submit" value="Sign Up"/>
            </form>
          : <button onClick={this.handleToggle}>Register</button>
        }
      </div>
    )
  }
}

export default Register
