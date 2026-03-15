import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../styles/Colors";

export default function ListingCard({ item }) {
  const isFeatured = item.membership === "premium" || item.featured;
  return (
    <View style={[styles.card, isFeatured && styles.featured]}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No image</Text>
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          {isFeatured && <Text style={styles.badge}>Featured</Text>}
        </View>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.category} • {item.sellerName || "Seller"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  featured: {
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  image: {
    width: "100%",
    height: 170,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },
  placeholderText: {
    color: Colors.gray,
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
    color: Colors.text,
  },
  badge: {
    fontSize: 11,
    color: "#fff",
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.gray,
  },
});

