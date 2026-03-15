import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../services/AuthContext";
import PrimaryButton from "../../components/PrimaryButton";
import ScreenContainer from "../../components/ScreenContainer";
import Colors from "../../styles/Colors";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      setError(e.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>CampusMarket</Text>
          <Text style={styles.subtitle}>
            Buy and sell with students on your campus.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Log in</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton
            title="Continue"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 12 }}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New here?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.footerLink}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
  },
  subtitle: {
    marginTop: 6,
    color: Colors.gray,
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text,
    marginBottom: 10,
  },
  error: {
    color: Colors.danger,
    marginTop: 4,
    fontSize: 13,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    color: Colors.gray,
    marginRight: 4,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: "600",
  },
});

