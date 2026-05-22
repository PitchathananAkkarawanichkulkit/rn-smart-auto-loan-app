import { Text, View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/input");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/loan.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={styles.txt1}>Smart Auto Loan</Text>
      <Text style={styles.txt2}>วางแผนออกรถฉบับมือโปร</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  txt1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Kanit_700Bold",
  },
  txt2: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Kanit_400Regular",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#061a23",
  },
});
