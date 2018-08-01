import React, { Component } from 'react';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { connect } from 'react-redux';
import uuid from 'uuid';
import {
  getPosts,
  deletePost,
  likePost,
  dislikePost,
  deleteComment
} from '../actionCreator';

class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts());
  }
  handleDelete = id => {
    this.props.dispatch(deletePost(id));
  };
  render() {
    if (this.props.posts.length === 0) {
      return (
        <div>
          <h1>Hey</h1>
        </div>
      );
    } else {
      let posts = this.props.posts.map(post => {
        return (
          // todo: refactor this
          <div key={uuid()}>
            <Post
              post={post}
              key={post.key}
              delete={() => this.handleDelete(post.id)}
              toggleEdit={() => {
                this.props.dispatch({ type: 'TOGGLE_EDIT', id: post.id });
              }}
              like={() => {
                this.props.dispatch(likePost(post.id));
              }}
              dislike={() => {
                this.props.dispatch(dislikePost(post.id));
              }}
              deleteComment={comment_id => {
                this.props.dispatch(deleteComment(post.id, comment_id));
              }}
            />
          </div>
        );
      });
      return <div>{posts}</div>;
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts
  };
}
export default connect(mapStateToProps)(PostList);
