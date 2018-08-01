import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getPosts } from '../actionCreator';
import uuid from 'uuid';

class TitleList extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts());
  }
  render() {
    const titles = this.props.titles.map(title => {
      return (
        <Segment key={uuid()}>
          <strong>{title.title}</strong>
        </Segment>
      );
    });
    return <Segment.Group>{titles}</Segment.Group>;
  }
}

function mapStateToProps(reduxState) {
  return {
    titles: reduxState.posts.map(post => {
      return { title: post.title, key: post.key };
    })
  };
}

export default connect(mapStateToProps)(TitleList);
