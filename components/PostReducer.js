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
  return [
    result,
    posts.length,
  ];
}

function searchPosts(originalPosts, text) {
  return subPosts(filterPosts(originalPosts, text), 0);
}

function retrievePosts(originalPosts, offset, keySearch) {
  return subPosts(filterPosts(originalPosts, keySearch), offset);
}

export function reducer(state, action) {
  let [posts, newTotal] = [];
  switch (action.type) {
    case "save":
      const original = action.originalPosts || [];
      [posts, newTotal] = subPosts(original, 0);
      return {
        ...state,
        originalPosts: original,
        total: newTotal,
        posts: posts,
      };
    case "retrieve":
      const keySearch = action.text || state.text;
      [posts, newTotal] = retrievePosts(state.originalPosts, state.posts.length, keySearch);
      return {
        ...state,
        text: keySearch,
        total: newTotal,
        posts: posts,
      };
    case "search":
      [posts, newTotal] = searchPosts(state.originalPosts, action.text);
      return {
        ...state,
        text: action.text,
        total: newTotal,
        posts: posts,
      };
    default:
      throw new Error();
  }
}
