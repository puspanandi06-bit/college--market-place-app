import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { listingsApi } from "../../services/api";
import ScreenContainer from "../../components/ScreenContainer";
import ListingCard from "../../components/ListingCard";
import Colors from "../../styles/Colors";

const CATEGORIES = [
  "All",
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Tickets",
  "Other",
];

export default function FeedScreen() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await listingsApi.list(category);
        const featuredFirst = (data.items || data).sort((a, b) => {
          const aFeatured = a.featured || a.membership === "premium";
          const bFeatured = b.featured || b.membership === "premium";
          if (aFeatured === bFeatured) return 0;
          return aFeatured ? -1 : 1;
        });
        if (!cancelled) {
          setListings(featuredFirst);
        }
      } catch (e) {
        if (!cancelled) {
          setListings([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Marketplace</Text>
      </View>

      <FlatList
        horizontal
        data={CATEGORIES}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        style={{ marginVertical: 10 }}
        renderItem={({ item }) => {
          const isActive = category === item;
          return (
            <TouchableOpacity
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : listings.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>No listings yet.</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListingCard item={item} />}
          contentContainerStyle={{ paddingVertical: 4, paddingBottom: 20 }}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipLabel: {
    fontSize: 13,
    color: Colors.text,
  },
  chipLabelActive: {
    color: "#fff",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    color: Colors.gray,
  },
});

