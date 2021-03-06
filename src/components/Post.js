import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import EditablePost from './EditablePost';
import Comments from './Comments';
import { throws } from 'assert';
class Post extends Component {
  state = {
    isEditing: false,
    isViewingComments: false
  };
  toggleComments = () => {
    this.setState({
      isViewingComments: !this.state.isViewingComments
    });
  };

  render() {
    if (this.state.isEditing === true) {
      return (
        <div>
          <h3>Edit Post</h3>
          <EditablePost
            id={this.props.post.id}
            title={this.props.post.title}
            body={this.props.post.body}
          />
        </div>
      );
    } else {
      return (
        <div style={{ marginBottom: '48px' }}>
          <h2>{this.props.post.title}</h2>
          <p style={{ textAlign: 'left' }}>{this.props.post.body}</p>
          <div>
            <Comments
              postId={this.props.post.id}
              comments={this.props.post.comments}
              isViewingComments={this.state.isViewingComments}
              toggle={this.toggleComments}
              deleteComment={this.props.deleteComment}
            />
          </div>
          <div>
            <Button.Group labeled floated="left" size="mini">
              <Button
                color="red"
                active
                icon="heart"
                content={this.props.post.likes}
              />
              <Button
                onClick={this.props.like}
                color="green"
                icon="thumbs up"
              />
              <Button onClick={this.props.dislike} color="orange" icon>
                <Icon name="thumbs down" />
              </Button>
              <Button
                color="blue"
                icon="comment"
                content={this.props.post.comments.length}
                onClick={() =>
                  this.setState({
                    isViewingComments: !this.state.isViewingComments
                  })
                }
              />
            </Button.Group>
            <Button.Group floated="right" size="mini">
              <Button
                color="yellow"
                onClick={() =>
                  this.setState({
                    isEditing: true
                  })
                }
                icon
              >
                Edit
              </Button>
              <Button onClick={this.props.delete} color="red" icon>
                Delete
              </Button>
            </Button.Group>
          </div>
        </div>
      );
    }
  }
}

export default Post;
