import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <BodyText>The game is over</BodyText>
        <Image source={require("../assets/maxresdefault.jpg")} style={styles.img} />
      <BodyText>It took: {props.guesses} attempts</BodyText>
      <BodyText>The number was: {props.userChoice}</BodyText>
      <Button title="play again" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: 300,
  },
});

export default GameOverScreen;
