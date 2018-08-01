import React, { Component } from 'react';
import uuid from 'uuid';
import NewCommentForm from '../containers/NewCommentForm';
import { Segment, Button } from 'semantic-ui-react';
import { deleteComment } from '../actionCreator';
class Comments extends Component {
  render() {
    const comments = this.props.comments
      .sort((a, b) => a.comment_id - b.comment_id)
      .map(comment => {
        return (
          <div key={uuid()}>
            <Segment attached="bottom" textAlign="left">
              {/* <h5>{comment.user}</h5> */}
              <div className="deleteButton">
                <Button
                  onClick={this.props.deleteComment}
                  size="tiny"
                  compact={true}
                  color="red"
                  icon="delete"
                  onClick={() => this.props.deleteComment(comment.comment_id)}
                />
              </div>
              <p>{comment.comment_id}</p>
              <p>{comment.text}</p>
            </Segment>
          </div>
        );
      });
    if (this.props.isViewingComments) {
      if (comments.length === 0) {
        return (
          <NewCommentForm
            toggleComments={this.props.toggle}
            postId={this.props.postId}
          />
        );
      } else {
        return (
          <div>
            <Segment.Group attached="top">{comments}</Segment.Group>
            <NewCommentForm
              toggleComments={this.props.toggle}
              postId={this.props.postId}
            />
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}

export default Comments;
