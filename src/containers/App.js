import React, { Component } from 'react';
import PostList from './PostList';
import TitleList from './TitleList';
import NewPostForm from './NewPostForm';
import { Grid, Segment } from 'semantic-ui-react';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" width={3}>
              <TitleList />
            </Grid.Column>
            <Grid.Column textAlign="center" width={10}>
              <PostList />
            </Grid.Column>
            <Grid.Column floated="right" width={3} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={8}>
              <NewPostForm />
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
