import type { Node } from "react";
import React from "react";
import { SafeAreaView, StatusBar, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import AnimatedImage from "./components/AnimatedImage";
import { SearchComponent } from "./components/SearchComponent";
import PostsComponent from "./components/PostsComponent";
import PostContextProvider from "./components/PostContext";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          display: "flex",
          height: "100%",
          flexDirection: "column",
        }}>

        <AnimatedImage />

        <PostContextProvider>
          <>
            <SearchComponent />
            <PostsComponent />
          </>
        </PostContextProvider>

      </View>
    </SafeAreaView>
  );
};
export default App;
