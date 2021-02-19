import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

// returns a random number within the interval, and != exclude
const createRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  // this get stuck

  // if (userChoice === currentGuess){
  //   return;
  // }
  if (randomNum === exclude) {
    return createRandomNum(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  // current Guess initialized as random between 1 - 100
  const [currentGuess, setGuess] = useState(
    createRandomNum(1, 100, props.userChoice)
  );

  const [numGuesses, setNumGuess] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // userChoice is what the computer is trying to guess
  const { userChoice, onGameOver } = props;

  // called when currentGuess changes
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(numGuesses);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't Lie!", "Wrong direction", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if ((direction === "lower")) {
      currentHigh.current = currentGuess;
    } else if ((direction === "higher")) {
      currentLow.current = currentGuess;
    }

    const nextNumber = createRandomNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setGuess(nextNumber);
    setNumGuess((numGuesses) => numGuesses + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Computers Guess</Text>
      <NumberContainer selectedNum={currentGuess}></NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="Lower"
          onPress={() => {
            nextGuessHandler("lower");
          }}
        />
        <Button
          title="Higher"
          onPress={() => {
            nextGuessHandler("higher");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "60%",
  },
});

export default GameScreen;
