import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class TitleList extends Component {
  state = {};
  render() {
    const titles = this.props.titles.map(title => {
      return <Segment key={title.key}>{title.title}</Segment>;
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
