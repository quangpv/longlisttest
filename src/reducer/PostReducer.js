import { PostNumberRandom } from "../utils/PostNumberRandom";

const pageLimit = 20;

function filterPosts(originalPosts, text) {
  const key = text.trimStart().trimEnd().toLowerCase();
  return key.length === 0 ? originalPosts : originalPosts.filter(it => {
    return it.body.includes(key);
  });
}

function subPosts(posts, offset) {
  const count = Math.min(offset + pageLimit, posts.length);
  const result = [];
  for (let index = 0; index < count; index++) {
    result.push(posts[index]);
  }
  return {
    posts: result,
    allPosts: posts,
  };
}

function searchPosts(state, text) {
  return subPosts(filterPosts(state.originalPosts, text), 0);
}

function retrievePosts(state) {
  return subPosts(state.allPosts, state.posts.length);
}

function reRenderPosts(state) {
  const random = new PostNumberRandom();
  const originalPosts = state.originalPosts.map(it => ({ ...it, number: random.randomNext() }));

  return {
    originalPosts,
    ...subPosts(filterPosts(originalPosts, state.text), state.posts.length),
  };
}

function savePosts(originalPosts) {
  const random = new PostNumberRandom();
  originalPosts = originalPosts.map(it => ({ ...it, number: random.randomNext() }));
  return {
    originalPosts,
    ...subPosts(originalPosts, 0),
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "save":
      const original = action.originalPosts || [];
      return {
        ...state,
        ...savePosts(original),
      };
    case "retrieve":
      return {
        ...state,
        ...retrievePosts(state),
      };
    case "search":
      return {
        ...state,
        text: action.text,
        ...searchPosts(state, action.text),
      };
    case "re-render":
      return {
        ...state,
        ...reRenderPosts(state),
      };
    default:
      throw new Error();
  }
}
