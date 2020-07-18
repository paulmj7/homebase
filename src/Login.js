import React, { Component } from "react"

class Login extends Component {
  constructor() {
    super()
    this.state = {
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
    this.props.onSubmit(this.state.emailAddress, this.state.password, event)
    this.setState({ emailAddress: "", password: "", clicked: false })
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
          ? <form className="login-form" onSubmit={this.handleSubmit}>
              <input type="email" placeholder="Enter email" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange}/>
              <input type="password" placeholder="Enter password"  name="password" value={this.state.password} onChange={this.handleChange}/>
              <input type="submit" value="Login"/>
            </form>
          : <button onClick={this.handleToggle}>Login</button>
        }
      </div>
    )
  }
}

export default Login
