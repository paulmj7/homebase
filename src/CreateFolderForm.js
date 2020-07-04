import React, { Component } from "react"
import FolderCreateIcon from "./resources/create_new_folder-24px.svg"

class CreateFolderForm extends Component {
  constructor() {
    super()
    this.state = {
      folderName: "",
      clicked: false
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleToggle() {
    if (this.state.clicked) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true })
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(event, this.state.folderName)
    this.setState({ folderName: "", clicked: false })
  }
  render() {
    return (
      <div>
        <img className="hermesworker-nav-flex-item" onClick={this.handleToggle} src={FolderCreateIcon}/>
        {this.state.clicked &&
          <form className="upload-form" onSubmit={this.handleSubmit}>
            <input type="text" name="folderName" value={this.state.folderName} placeholder="Enter folder name" onChange={this.handleChange}/>
            <input type="submit" value="Create"/>
          </form>
        }
      </div>
    )
  }
}

export default CreateFolderForm
