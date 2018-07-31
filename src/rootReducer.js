import uuid from 'uuid';

let postId = 0;
const INITIAL_STATE = {
  posts: [
    // {
    //   postId: postId++,
    //   id: uuid(),
    //   key: uuid(),
    //   isEditing: false,
    //   likes: 0,
    //   comments: {
    //     comments: [
    //       { user: 'jason', content: 'hey' },
    //       { user: 'dennis', content: 'jason is cool' }
    //     ],
    //     isViewingComments: false
    //   },
    //   title: 'Hello World!',
    //   body:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // },
    // {
    //   postId: postId++,
    //   id: uuid(),
    //   key: uuid(),
    //   isEditing: false.value,
    //   likes: 0,
    //   comments: {
    //     comments: [{ user: 'jason', content: 'spamming your comments bro' }],
    //     isViewingComments: false
    //   },
    //   title: 'I ate cheesecake today!',
    //   body:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // },
    // {
    //   postId: postId++,
    //   id: uuid(),
    //   key: uuid(),
    //   isEditing: false,
    //   likes: 0,
    //   comments: {
    //     comments: [{ user: 'jason', content: 'jason wuz here' }],
    //     isViewingComments: false
    //   },
    //   title: 'What is the meaning of life?',
    //   body:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // }
  ]
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
        if (post.id === action.id) {
          post.likes = post.likes + 1;
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
        if (post.id === action.id) {
          post.likes = post.likes - 1;
          return post;
        } else {
          return post;
        }
      })
      .sort((a, b) => b.likes - a.likes);
    return { ...state, posts: dislikePost.sort((a, b) => b.likes - a.likes) };
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
        // TODO: don't modify state
        post.comments.comments.push(action.content);
        return post;
      } else {
        return post;
      }
    });
    return { ...state, posts: addCommentToPost };
  }

  return { ...state };
}
