import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CusButton from "../components/CusButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <BodyText>The game is over</BodyText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/maxresdefault.jpg")}
            style={styles.img}
            resizeMode="cover"
          />
        </View>

        <BodyText>
          It took: <Text style={styles.highlight}>{props.guesses}</Text>{" "}
          attempts
        </BodyText>
        <BodyText>
          The number was:{" "}
          <Text style={styles.highlight}>{props.userChoice}</Text>
        </BodyText>
        {/* <Button
            style={styles.summary}
            title=""
            onPress={props.onRestart}
            color='white'
          /> */}

        <CusButton
          color="white"
          style={styles.summary}
          onPress={props.onRestart}
        > Play Again </CusButton>
      </Card>
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
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "black",
    width: 200,
    height: 200,
    overflow: "hidden",
    marginVertical: 30,
  },
  summary: {
    marginVertical: 2,
    textAlign: "center",
    fontSize: 20,
    width: 50
  },
  highlight: {
    color: "white",
    fontFamily: "open-sans-bold",
  },
  cardContainer: {
    width: 450,
    height: "90%",
    backgroundColor: Colors.primary,
  },
});

export default GameOverScreen;
