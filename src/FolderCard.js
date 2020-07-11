import React, { Component } from "react"
import FolderIcon from "./resources/folder-24px.svg"
import FolderOpenIcon from "./resources/folder_open-24px.svg"

class FolderCard extends Component {
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
        <div draggable="true" onDragStart={(event) => this.props.onDrag(event, this.props.path, this.props.name)} onDragOver={(event) => this.props.onDragOver(event)} onDrop={(event) => this.props.onDrop(event, this.props.path)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={(event) => this.props.handleClick(this.props.root, this.props.path, this.props.name, event)} className="flex-item">
          <p className="item-title">{this.props.name}</p>
          <div>
            {!this.state.open
              ? <img src={FolderIcon}/>
              : <img src={FolderOpenIcon}/>
            }
          </div>
        </div>
      )
    }
}

export default FolderCard
