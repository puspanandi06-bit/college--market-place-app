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

export default function SignupScreen() {
  const navigation = useNavigation();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await signup(email.trim(), password, name.trim());
    } catch (e) {
      setError(e.message || "Failed to create account");
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
          <Text style={styles.title}>Join CampusMarket</Text>
          <Text style={styles.subtitle}>
            Create an account to start listing and discovering items.
          </Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor={Colors.gray}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Campus email"
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
            title="Create account"
            onPress={handleSignup}
            loading={loading}
            style={{ marginTop: 12 }}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerLink}>Log in</Text>
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
    fontSize: 28,
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

