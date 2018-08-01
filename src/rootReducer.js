import uuid from 'uuid';

let postId = 0;
const INITIAL_STATE = {
  posts: []
};

export default function rootReducer(state = INITIAL_STATE, action) {
  if (action.type === 'GET_POSTS') {
    return { ...state, posts: action.posts };
  }
  if (action.type === 'ADD_POST') {
    return {
      ...state,
      posts: [...state.posts, action.post]
    };
  }
  if (action.type === 'DELETE_POST') {
    return {
      ...state,
      posts: state.posts.filter(post => {
        return post.id !== action.id;
      })
    };
  }
  if (action.type === 'EDIT_POST') {
    const updatedPost = state.posts.map(post => {
      if (post.id === action.id) {
        post.title = action.post.title;
        post.body = action.post.body;
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: updatedPost };
  }
  if (action.type === 'TOGGLE_EDIT') {
    const toggleEditedPosts = state.posts.map(post => {
      if (post.id === action.id) {
        post.isEditing = true;
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: toggleEditedPosts };
  }

  if (action.type === 'LIKE_POST') {
    const likePost = state.posts
      .map(post => {
        if (post.id === action.likedPost.id) {
          post.likes = action.likedPost.likes;
          return post;
        } else {
          return post;
        }
      })
      .sort((a, b) => b.likes - a.likes);

    return { ...state, posts: likePost };
  }

  if (action.type === 'DISLIKE_POST') {
    const dislikePost = state.posts
      .map(post => {
        if (post.id === action.dislikedPost.id) {
          post.likes = action.dislikedPost.likes;
          return post;
        } else {
          return post;
        }
      })
      .sort((a, b) => b.likes - a.likes);
    return { ...state, posts: dislikePost };
  }
  if (action.type === 'VIEW_COMMENTS') {
    const toggleCommentsView = state.posts.map(post => {
      if (post.id === action.id) {
        post.comments.isViewingComments = !post.comments.isViewingComments;
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: toggleCommentsView };
  }
  if (action.type === 'ADD_COMMENT') {
    const addCommentToPost = state.posts.map(post => {
      if (post.id === action.id) {
        post.comments = [
          ...post.comments,
          { comment_id: action.comment.id, text: action.comment.text }
        ];
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: addCommentToPost };
  }
  if (action.type === 'DELETE_COMMENT') {
    const deleteCommentFromPost = state.posts.map(post => {
      if (post.id === action.id) {
        post.comments = post.comments.filter(
          comment => comment.comment_id !== action.comment_id
        );
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: deleteCommentFromPost };
  }

  return { ...state };
}
