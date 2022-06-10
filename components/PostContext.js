import React, { createContext, useEffect, useReducer } from "react";
import { fetchPosts } from "../model/fetch-post";
import { reducer } from "./PostReducer";

const initialState = {
  originalPosts: [],
  total: 0,
  text: "",
  posts: [],
  hasMore: function() {
    return this.posts.length < this.total;
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
    dispatch: function(action) {
      dispatchAction(action);
      if (action.type === "search") this?.onSearch?.(state.total);
    },
  };
  return <PostContext.Provider value={context}>
    {children}
  </PostContext.Provider>;
}
