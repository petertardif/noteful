import React, { Component } from 'react';

export default class NoteListError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if(this.state.hasError) {
      return (
        <h3>Could not display these notes.</h3>
      )
    }
    return this.props.children;
  }
}
