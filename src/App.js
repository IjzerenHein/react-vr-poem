import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  VrButton,
  NativeModules,
  asset
} from "react-360";
const { AudioModule } = NativeModules;
import * as poems from "./poems";

// TODO - make dynamic
function getPoem() {
  return poems.ieke || poems.test;
}

export class App extends React.Component {
  state = {
    poem: getPoem(),
    animValue: new Animated.Value(0),
    finished: true
  };

  startAnim() {
    const { animValue } = this.state;
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 60000
    }).start(() => {
      this.setState({
        finished: true
      });
    });
  }

  componentDidMount() {
    // Set background audio
    AudioModule.playEnvironmental({
      source: asset("xmas_audio.m4a"),
      //volume: 0.3, // play at 3/10 original volume
      volume: 0.5,
      loop: true
    });

    // Start if neccessary
    if (!this.state.finished) {
      this.startAnim();
    }
  }

  onClickStart = () => {
    this.setState({
      finished: false
    });
    this.startAnim();
  };

  render() {
    const { animValue, poem, finished } = this.state;
    return finished ? (
      <View style={styles.buttonContainer}>
        <VrButton style={styles.button} onClick={this.onClickStart}>
          <Text style={styles.buttonText}>START</Text>
        </VrButton>
      </View>
    ) : (
      <Animated.View
        style={[
          styles.panel,
          {
            opacity: animValue.interpolate({
              inputRange: [0, 0.005, 0.995, 1],
              outputRange: [0, 1, 1, 0]
            }),
            transform: [
              /*{
                translateZ: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0]
                })
              },*/
              {
                rotateZ: animValue.interpolate({
                  inputRange: [0, 0.25, 0.75, 1],
                  outputRange: [0, 30, -30, 0]
                })
              }
            ]
          }
        ]}
      >
        <Animated.View
          style={[
            styles.paper,
            {
              transform: [
                {
                  translateY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1250]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.text}>{poem}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    alignItems: "center"
  },
  paper: {
    backgroundColor: "white",
    padding: 40
  },
  text: {
    color: "black",
    //fontFamily: "Lobster",
    fontSize: 30
  },
  buttonContainer: {
    width: 1000,
    height: 600,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 200,
    height: 100,
    borderRadius: 20,
    backgroundColor: "royalblue",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50
  }
});
