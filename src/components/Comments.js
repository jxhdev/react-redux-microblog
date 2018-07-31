import React, { Component } from 'react';
import uuid from 'uuid';
import NewCommentForm from '../containers/NewCommentForm';
import { Segment, Button } from 'semantic-ui-react';
class Comments extends Component {
  render() {
    const comments = this.props.comments.map(comment => {
      return (
        <div>
          <Segment attached="bottom" textAlign="left" key={uuid()}>
            {/* <h5>{comment.user}</h5> */}
            <p>{comment.text}</p>
          </Segment>
        </div>
      );
    });
    if (this.props.isViewingComments) {
      return (
        <div>
          <Segment.Group attached="top">{comments}</Segment.Group>
          <NewCommentForm
            toggleComments={this.props.toggle}
            postId={this.props.postId}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Comments;
