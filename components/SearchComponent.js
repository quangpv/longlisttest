import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { PostContext } from "./PostContext";
import { Keyboard } from "react-native";

export function SearchComponent() {
  const context = useContext(PostContext);
  const [text, setText] = useState("");
  return <>
    <TextInput
      style={styles.input}
      value={text}
      placeholder={"Search by text"}
      onChangeText={(text) => {
        setText(text);
      }} />

    <TouchableOpacity style={styles.button} onPress={() => {
      Keyboard.dismiss();
      context.dispatch({ type: "search", text });
    }}>
      <Text style={{ color: "#000" }}>Re-render</Text>
    </TouchableOpacity>
  </>;
}

const styles = StyleSheet.create({
  input: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: 100,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#b9b9b9",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
