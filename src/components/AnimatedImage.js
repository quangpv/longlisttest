import React from "react";
import GifImage from "@lowkey/react-native-gif/src/index";

export default function AnimatedImage() {
  return <GifImage
    style={{ width: "100%" }}
    source={require("../images/doggo_walk.gif")}
    resizeMode={"cover"} />;
}
