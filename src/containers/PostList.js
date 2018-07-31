import React, { Component } from 'react';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getPosts, deletePost } from '../actionCreator';

class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts());
  }
  handleDelete = id => {
    this.props.dispatch(deletePost(id));
  };
  render() {
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
              this.props.dispatch({ type: 'LIKE_POST', id: post.id });
            }}
            dislike={() => {
              this.props.dispatch({ type: 'DISLIKE_POST', id: post.id });
            }}
            toggleComments={() => {
              this.props.dispatch({ type: 'VIEW_COMMENTS', id: post.id });
            }}
          />
          {/* <Comments key={uuid()} postId={post.id} commentsObj={post.comments} /> */}
        </div>
      );
    });

    return <div>{posts}</div>;
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts
  };
}
export default connect(mapStateToProps)(PostList);
