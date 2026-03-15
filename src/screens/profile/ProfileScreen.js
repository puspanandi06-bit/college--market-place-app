import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../../services/AuthContext";
import { listingsApi } from "../../services/api";
import ScreenContainer from "../../components/ScreenContainer";
import PrimaryButton from "../../components/PrimaryButton";
import ListingCard from "../../components/ListingCard";
import Colors from "../../styles/Colors";

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await listingsApi.mine(token);
        if (!cancelled) {
          setListings(data.items || data);
        }
      } catch {
        if (!cancelled) {
          setListings([]);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const membership = profile?.membership || "free";

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{profile?.displayName || user.email}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.membershipBadge}>
          <Text style={styles.membershipLabel}>
            {membership === "premium" ? "Premium member" : "Free member"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.membershipCard}>
        <Text style={styles.membershipTitle}>Membership</Text>
        <Text style={styles.membershipText}>
          Premium members get highlighted, featured listings for maximum visibility on campus.
        </Text>
        {membership === "premium" ? (
          <Text style={styles.currentPlan}>You’re on Premium 🎉</Text>
        ) : (
          <PrimaryButton title="Upgrade to Premium (mock)" onPress={() => {}} />
        )}
      </View>

      <View style={styles.listingsHeader}>
        <Text style={styles.sectionTitle}>Your listings</Text>
        <Text style={styles.sectionCount}>{listings.length}</Text>
      </View>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <PrimaryButton
        title="Log out"
        onPress={logout}
        style={{ marginTop: 8 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },
  email: {
    color: Colors.gray,
    marginTop: 2,
  },
  membershipBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primarySoft,
  },
  membershipLabel: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
  membershipCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: Colors.text,
  },
  membershipText: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 10,
  },
  currentPlan: {
    fontSize: 13,
    color: Colors.gold,
    fontWeight: "600",
  },
  listingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  sectionCount: {
    marginLeft: 6,
    color: Colors.gray,
  },
});

