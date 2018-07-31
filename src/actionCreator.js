import axios from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export function getPosts() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/posts`);
      return dispatch({
        type: 'GET_POSTS',
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
      const response = await axios.post(`${BACKEND_URL}/api/posts`, post);
      dispatch({ type: 'ADD_POST', post: response.data });
    } catch (err) {
      console.error(err);
    }
  };
}

export function deletePost(id, post) {
  return async function(dispatch) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/posts/${id}`);
      dispatch({ type: 'DELETE_POST', id });
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
      dispatch({ type: 'EDIT_POST', id, post });
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
      dispatch({ type: 'ADD_COMMENT', id, comment });
    } catch (err) {
      console.error(err);
    }
  };
}
