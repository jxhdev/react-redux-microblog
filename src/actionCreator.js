import axios from 'axios';
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  TOGGLE_EDIT,
  LIKE_POST,
  DISLIKE_POST,
  VIEW_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT
} from './actionType';

const BACKEND_URL = 'http://localhost:3000';

export function getPosts() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/posts`);
      return dispatch({
        type: GET_POSTS,
        posts: response.data
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function addPost(post) {
  return async function(dispatch) {
    try {
      let response = await axios.post(`${BACKEND_URL}/api/posts`, post);
      response.data.comments = [];
      dispatch({ type: ADD_POST, post: response.data });
    } catch (err) {
      console.error(err);
    }
  };
}

export function deletePost(id, post) {
  return async function(dispatch) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/posts/${id}`);
      dispatch({ type: DELETE_POST, id });
    } catch (err) {
      console.error(err);
    }
  };
}

export function editPost(id, post) {
  return async function(dispatch) {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/posts/${id}`,
        post
      );
      dispatch({ type: EDIT_POST, id, post });
    } catch (err) {
      console.error(err);
    }
  };
}

export function likePost(id) {
  return async function(dispatch) {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/posts/${id}/like`);
      dispatch({ type: LIKE_POST, likedPost: response.data });
    } catch (err) {
      console.error(err);
    }
  };
}
export function dislikePost(id) {
  return async function(dispatch) {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/posts/${id}/dislike`
      );

      dispatch({ type: DISLIKE_POST, dislikedPost: response.data });
    } catch (err) {
      console.error(err);
    }
  };
}

export function addComment(id, comment) {
  return async function(dispatch) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/posts/${id}/comments`,
        comment
      );
      dispatch({ type: ADD_COMMENT, id, comment: response.data });
    } catch (err) {
      console.error(err);
    }
  };
}

export function deleteComment(post_id, comment_id) {
  return async function(dispatch) {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/posts/${post_id}/comments/${comment_id}`
      );
      dispatch({ type: DELETE_COMMENT, id: post_id, comment_id });
    } catch (err) {
      console.error(err);
    }
  };
}
