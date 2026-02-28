import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
const logo = require("@/assets/images/sakonnakorn.png");

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>สกลนคร</Text>
      <Text style={styles.caption}>เมืองแห่งธรรมชาติและรอยอารยธรรม</Text>
      <ActivityIndicator
        size="large"
        color="#B85042"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: { width: 150, height: 150, marginBottom: 20, borderRadius: 20 },
  title: {
    fontFamily: "pridi_700Bold",
    fontSize: 28,
    color: "#1F2937",
  },
  caption: {
    fontFamily: "pridi_400Regular",
    fontSize: 16,
    color: "#6B7280",
    marginTop: 10,
  },
});
