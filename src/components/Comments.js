import React, { Component } from 'react';
import uuid from 'uuid';
import NewCommentForm from '../containers/NewCommentForm';
import { Segment } from 'semantic-ui-react';
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const comments = this.props.commentsObj.comments.map(comment => {
      return (
        <Segment textAlign="left" key={uuid()}>
          <h5>{comment.user}</h5>
          <p>{comment.content}</p>
        </Segment>
      );
    });
    if (this.props.commentsObj.isViewingComments) {
      return (
        <div>
          <Segment.Group>{comments}</Segment.Group>
          <NewCommentForm postId={this.props.postId} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Comments;
