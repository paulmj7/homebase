import React, { Component } from "react"
import { formatBytes, upload } from "./helpers"
import FolderCard from "./FolderCard"
import FileCard from "./FileCard"
import FolderIcon from "./resources/folder-24px.svg"
import FolderOpenIcon from "./resources/folder_open-24px.svg"
import UploadForm from "./UploadForm"
import CreateFolderForm from "./CreateFolderForm"

class HermesWorker extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currPath: "",
      visited: [{name: "This Drive", path: "@back", root: ""}]
    }

    this.handleFolderClick = this.handleFolderClick.bind(this)
    this.handleFileClick = this.handleFileClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreateFolder = this.handleCreateFolder.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
  }
  componentDidMount() {
    if (this.props.url.length === 0) return
    fetch(this.props.url)
    .then(res => res.json())
    .then(items => this.setState({ items }))
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== this.props.url) {
      this.setState({ url: this.props.url })
    }
    if (prevState.url !== this.state.url) {
      this.componentDidMount()
    }
  }
  handleFolderClick(root, path, name, event) {
    event.preventDefault()
    const item = {"root": root, "path": path, "name": name}
    let v = this.state.visited
    for (let i = 0; i < v.length; i++) {
      if (v[i].path === path) {
        v = v.slice(0, i + 1)
        break
      }
      if (i + 1 === v.length) {
        v.push(item)
        break
      }
    }
    this.setState({ visited: v, currPath: path })
    if (path === "@back") {
      this.componentDidMount()
    } else {
      fetch(this.props.url + "/change_dir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "root": root, "path": path, "name": name })
      }).then(res => res.json())
      .then(items => this.setState({ items }))
    }
  }
  handleFileClick(root, path, name, event) {
    event.preventDefault()
    fetch(this.props.url + "/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "root": root, "path": path, "name": name })
    }).then(res => res.json())
    .then(res => {
      const url = this.props.url + "/send?key=" + res["key"]
      window.location.href = url
    })
  }
  handleSubmit(event, file) {
    event.preventDefault()
    let url = this.props.url
    upload(file, url, this.state.currPath, event)
  }
  handleCreateFolder(event, folderName) {
    event.preventDefault()
    fetch(this.props.url + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path: this.state.currPath + "/" + folderName })
    })
  }
  handleDrag(event, path, name) {
    event.dataTransfer.setData("text", path)
    event.dataTransfer.setData("name", name)
  }
  handleDrop(event, path) {
    event.preventDefault()
    const data = event.dataTransfer.getData("text")
    const name = event.dataTransfer.getData("name")
    fetch(this.props.url + "/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "location": data, "destination": path + "/" + name })
    })
  }
  handleDragOver(event) {
    event.preventDefault()
  }
  render() {
    const folders = this.state.items.map((item) => {
      if (!item.isfile) {
        return <FolderCard onDrag={this.handleDrag} onDragOver={this.handleDragOver} onDrop={this.handleDrop} handleClick={this.handleFolderClick} root={item.root} path={item.path} isfile={item.isfile} name={item.name} size={item.size}/>
      }
    })
    const files = this.state.items.map((item) => {
      if (item.isfile) {
        return <FileCard onDrag={this.handleDrag} handleClick={this.handleFileClick} root={item.root} path={item.path} isfile={item.isfile} name={item.name} size={item.size}/>
      }
    })
    const pathButtons = this.state.visited.map((item) => {
      return (
        <div className="path-buttons-tuple">
          <PathButton handleClick={this.handleFolderClick} root={item.root} path={item.path} name={item.name}/>
          <h3 className="path-buttons-sep">➤</h3>
        </div>
      )
    })
    return (
      <div className="hermesworker">
        <div className="hermesworker-nav">
          <div className="path-buttons">
            {pathButtons}
          </div>
          <div className="hermesworker-nav-buttons">
            <UploadForm handleSubmit={this.handleSubmit}/>
            <CreateFolderForm handleSubmit={this.handleCreateFolder}/>
          </div>
        </div>
        <div className="overflow-scroll">
          <div className="flex-container">
            {folders}
            {files}
          </div>
        </div>
      </div>
    )
  }
}

const PathButton = (props) => {
  return (
    <button className="path-button" onClick={(event) => props.handleClick(props.root, props.path, props.name, event)}>{props.name}</button>
  )
}

export default HermesWorker
