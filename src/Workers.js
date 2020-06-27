import React, { Component } from "react"

const Workers = (props) => {
    return (
      <ul className="workers worker-list">
        <button className="worker-list-item" onClick={() => props.handleClick("http://localhost:5000/api")}>Worker 1</button>
        <button className="worker-list-item" onClick={() => props.handleClick("http://localhost:2000/api")}>Worker 2</button>
      </ul>
    )
  }

  export default Workers