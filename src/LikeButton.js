import React, { Component } from 'react'
import FlatButton from './FlatButton'

export default class LikeButton extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render () {
    const { like } = this.props

    if (like) {
      return (
        <FlatButton href='#' color='orange' onClick={this.onClick}>Unike</FlatButton>
      )
    } else {
      return (
        <FlatButton href='#' color='green' onClick={this.onClick}>Like</FlatButton>
      )
    }
  }
}