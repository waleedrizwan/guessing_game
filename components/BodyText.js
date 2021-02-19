import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-bold",
  },
});

export default BodyText;
