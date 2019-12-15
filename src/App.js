import React from "react";
import { StyleSheet, Text, View, Animated } from "react-360";
import poem from "./poem";

export class App extends React.Component {
  state = {
    scrollOffset: new Animated.Value(0)
  };

  componentDidMount() {
    console.log("didMount");
    const { scrollOffset } = this.state;
    Animated.timing(scrollOffset, {
      toValue: 100,
      duration: 2000
    }).start();
  }

  render() {
    const { scrollOffset } = this.state;
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Animated.Text
            style={[
              styles.greeting,
              {
                transform: [{ translateY: scrollOffset }]
              }
            ]}
          >
            {poem}
          </Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
    overflow: "hidden"
  },
  greeting: {
    fontSize: 30
  }
});
