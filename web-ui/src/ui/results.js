import React, { Component } from 'react'
import * as R from 'ramda'
import Fade from 'material-ui/transitions/Fade'
import {
  List,
  ListItemIcon,
  Icon,
  Typography,
  Input,
  Paper,
  Button,
  LinearProgress,
  ListItem,
  ListItemText,
  Avatar
} from 'material-ui'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Results extends Component {
  renderLoading(loading) {
    return (
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? '800ms' : '0ms'
        }}
        unmountOnExit
      >
        <LinearProgress />
      </Fade>
    )
  }

  renderResult(result) {
    return (
      <ListItem key={result.id} dense button>
        <img alt={result.title} src={result.image_url} style={{ width: 65 }} />
        <ListItemText
          primary={result.title}
          secondary={`${result.episodes} episode${
            result.episode === 1 ? '' : 's'
          }`}
        />
        <ListItemIcon>
          <Icon>more_horiz</Icon>
        </ListItemIcon>
      </ListItem>
    )
  }

  render() {
    let { data } = this.props

    // No data, query hasn't been executed
    if (!data) return null

    // Query is currently being executed
    if (data.loading) return this.renderLoading(data.loading)

    let results = R.pathOr([], ['search'], data)

    // Query finished with no results
    if (!results || results.length <= 0)
      return (
        <div>
          <Typography>No results found.</Typography>
        </div>
      )
    // Got results
    return (
      <div style={{ paddingTop: 10 }}>
        <List>{results.map(this.renderResult.bind(this))}</List>
      </div>
    )
  }
}

export default graphql(
  gql`
    query($term: String) {
      search(name: $term) {
        title
        id
        image_url
        episodes
      }
    }
  `,
  {
    skip: props => !props.term,
    options: props => ({
      variables: {
        term: props.term
      }
    })
  }
)(Results)
