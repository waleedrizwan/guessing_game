import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import CusButton from "../components/CusButton";

const StartGameScreen = (props) => {
  // state management
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmation] = useState(false);
  const [selectedNum, setSelectedNum] = useState("");

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmation(false);
  };

  const confirmInputHandler = () => {
    const enteredNum = parseInt(enteredValue);
    if (isNaN(enteredNum) || enteredNum <= 0 || enteredNum > 99) {
      Alert.alert("Invalid Number", " Num must > 1 & < 99 ", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);

      return;
    } else {
      setConfirmation(true);
      setSelectedNum(parseInt(enteredValue));
      setEnteredValue("");
      Keyboard.dismiss();
    }
  };

  let confirmedOutput;

  if (confirmed) {
    // do stuff
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Chose</Text>
        <NumberContainer selectedNum={selectedNum} />
        <CusButton onPress={() => props.startGame(selectedNum)}>Start</CusButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <BodyText>
          <Text style={styles.title}>Start a new game</Text>{" "}
        </BodyText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="reset"
                onPress={() => {
                  resetInputHandler();
                }}
                color={colors.primary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="confirm"
                onPress={() => {
                  confirmInputHandler();
                }}
                color={colors.secondary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    // takes remaining space
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    // flex: 1
  },
  button: {
    width: 80,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "50%",
  },
  text: {
    fontFamily: "open-sans-bold",
  },
});

export default StartGameScreen;
