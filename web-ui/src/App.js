import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, CssBaseline } from 'material-ui'

import UI from './ui'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <div className={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" style={styles.flex}>
                MyAnimeList
              </Typography>
            </Toolbar>
          </AppBar>

          <UI />
        </div>
      </div>
    )
  }
}

export default App
