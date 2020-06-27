import React, { Component } from "react"
import UploadFileIcon from  "./resources/cloud_upload-24px.svg"

class UploadForm extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
      file: ""
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleToggle() {
    let toggle = true
    if (this.state.clicked) {
      toggle = false
    }
    this.setState({ clicked: toggle })
  }
  handleFileChange(event) {
    this.setState({ file: event.target.files[0] })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(event, this.state.file)
    this.fileInput.value = ""
    this.setState({
      file: "",
      clicked: false
    })
  }
  render() {
    let inputMessage = "⤒"
    if (this.state.file) {
      inputMessage = "READY"
    }
    return (
      <div>
        {this.state.clicked &&
          <form className="upload-form" onSubmit={this.handleSubmit}>
            <div className="upload-form-top">
              <label className="upload-form-file-input" for="file-upload">
                <input id="file-upload" type="file" name="upload" ref={ref => this.fileInput = ref} onChange={this.handleFileChange}/>
                {inputMessage}
              </label>
            </div>
            <div className="upload-form-bottom">
              <input className="submit-button" type="submit" value="✓"/>
              <button className="close-button" onClick={this.handleToggle}>X</button>
            </div>
          </form>
        }
        <img className="hermesworker-nav-flex-item" onClick={this.handleToggle} src={UploadFileIcon}/>
      </div>
    )
  }
}

export default UploadForm
