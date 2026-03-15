import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

export default function ScreenContainer({ children, style }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});

