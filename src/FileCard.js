import React, { Component } from "react"
import { formatBytes } from "./helpers"

class FileCard extends Component {
    constructor() {
      super()
      this.state = { open: false }
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }
    handleMouseEnter() {
      this.setState({ open: true })
    }
    handleMouseLeave() {
      this.setState({ open: false })
    }
    render() {
      return (
        <div draggable={this.props.isfile} onDragStart={(event) => this.props.onDrag(event, this.props.path)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={(event) => this.props.handleClick(this.props.root, this.props.path, this.props.name, event)} className="flex-item">
          <p className="item-title">{this.props.name}</p>
          <p>{formatBytes(this.props.size)}</p>
        </div>
      )
    }
  }

  export default FileCard
