import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'

import Results from './results'

export default class Search extends Component {
  constructor(props, b) {
    super(props)
    this.state = {
      term: ''
    }
  }

  onRequestSearch(term) {
    this.setState({
      term: term
    })
  }

  render() {
    return (
      <div
        style={{
          margin: 20,
          padding: 20,
          maxWidth: 800,
          margin: '5px auto 0'
        }}
      >
        <SearchBar onRequestSearch={this.onRequestSearch.bind(this)} />
        <Results term={this.state.term} />
      </div>
    )
  }
}
