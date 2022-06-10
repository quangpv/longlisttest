import { FlatList, Text } from "react-native";
import React, { useContext, useRef } from "react";
import { PostContext } from "./PostContext";

export default function PostsComponent() {
  const context = useContext(PostContext);
  const listRef = useRef();
  const state = context.state;

  const retrieveMore = () => {
    if (!state.hasMore()) return;
    context.dispatch({ type: "retrieve" });
  };

  return <FlatList
    ref={listRef}
    initialNumToRender={5}
    style={{ paddingStart: 10, paddingEnd: 10 }}
    data={state.posts}
    renderItem={({ item }) => <ItemPost item={item} />}
    keyExtractor={(item, index) => index.toString()}
    onEndReached={retrieveMore}
    onEndReachedThreshold={1}
  />;
}

function ItemPost({ item }) {
  return <Text style={{ marginTop: 10, color: "#000" }}>
    <Text>{item.id}: {item.body} </Text>
    <Text style={{ fontWeight: "bold" }}>{item.number}</Text>
  </Text>;
}
