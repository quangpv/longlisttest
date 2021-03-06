import React, { createContext, useEffect, useReducer } from "react";
import { fetchPosts } from "../model/fetch-post";
import { reducer } from "../reducer/PostReducer";

const initialState = {
  originalPosts: [],
  allPosts: [],
  text: "",
  posts: [],
  hasMore: function() {
    return this.posts.length < this.allPosts.length;
  },
};

export const PostContext = createContext({
  state: initialState,
  dispatch: () => {
  },
});


export default function PostContextProvider({ children }) {
  const [state, dispatchAction] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchPosts().then(it => {
      dispatchAction({ type: "save", originalPosts: it });
    });
  }, []);

  const context = {
    state: state,
    dispatch: dispatchAction,
  };
  return <PostContext.Provider value={context}>
    {children}
  </PostContext.Provider>;
}
