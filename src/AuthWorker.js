import React, { Component } from "react"
import Register from "./Register"
import Login from "./Login"
import Cookies from "js-cookie"

class AuthWorker extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: ""
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  componentDidMount() {
    const e = Cookies.get("emailAddress")
    if (e) {
      const f = Cookies.get("firstName")
      const l = Cookies.get("lastName")
      const s = Cookies.get("secretKey")
      console.log(s)
      this.setState({ firstName: f, lastName: l, emailAddress: e })
      this.props.onAuth(e, s)
    }
  }
  handleRegister(fname, lname, email, pass, event) {
    event.preventDefault()
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "f_name": fname, "l_name": lname, "email_address": email, "password": pass })
    }).then(res => res.json())
    .then(res => {
      if (res.message.localeCompare("success") === 0) {
        alert("Success")
      }
    })
  }
  handleLogin(email, pass, event) {
    event.preventDefault()
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "email_address": email, "password": pass })
    }).then(res => res.json())
    .then(res => {
      if (res.message.localeCompare("success") === 0) {
        alert("Success")
      }
      Cookies.set("secretKey", res.secret_key)
      this.setState({ firstName: res.f_name, lastName: res.l_name, emailAddress: email })
    })
    .then(() => {
      Cookies.set("emailAddress", this.state.emailAddress)
      Cookies.set("firstName", this.state.firstName)
      Cookies.set("lastName", this.state.lastName)
      this.props.onAuth(this.state.emailAddress)
    })
  }
  render() {
    let fullName = this.state.firstName + " " + this.state.lastName
    return (
      <div>
        {this.state.emailAddress
          ? <h3 className="nav-user-name">{fullName}</h3>
          : <div>
              <Register onSubmit={this.handleRegister}/>
              <Login onSubmit={this.handleLogin}/>
            </div>
        }
      </div>
    )
  }
}

export default AuthWorker
