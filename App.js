import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNum, setuserNum] = useState();
  const [numGuess, setNumGuess] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const startGameHandler = (selectedNum) => {
    setuserNum(selectedNum);
    setNumGuess(0);
  };

  const gameOverHandler = (guessNumber) => {
    setNumGuess(guessNumber);
  };
 
  const restartHandler = () => {
    setNumGuess(0);
    setuserNum();
  };

  if (dataLoaded === false) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  let content = <StartGameScreen startGame={startGameHandler} />;

  // if user has confirmed a number, show game screen
  if (userNum && numGuess <= 0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} />;
  } // if number has been found, returns the number of guesses and displays game over screen
  else if (numGuess > 0) {
    content = (
      <GameOverScreen
        guesses={numGuess}
        userChoice={userNum}
        onRestart={restartHandler}
      />
    );
  } else {
    //do nothing
  }

  return (
    <View style={styles.screen}>
      <Header title={"Number Guessing Game!"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: 'black'
  },
  content: {
    alignItems: 'center'
  }
});
