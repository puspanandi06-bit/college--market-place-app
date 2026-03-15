import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../services/AuthContext";
import { listingsApi } from "../../services/api";
import ScreenContainer from "../../components/ScreenContainer";
import PrimaryButton from "../../components/PrimaryButton";
import Colors from "../../styles/Colors";

const CATEGORIES = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Tickets",
  "Other",
];

export default function CreateListingScreen() {
  const { user, token } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreate = async () => {
    if (!title || !price) {
      Alert.alert("Missing info", "Please add at least a title and price.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", String(price));
      formData.append("category", category);
      formData.append("description", description);
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName || "listing.jpg",
          type: image.mimeType || "image/jpeg",
        });
      }
      await listingsApi.create(formData, token);
      setTitle("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setDescription("");
      setImage(null);
      Alert.alert("Listing created", "Your item is now live.");
    } catch (e) {
      Alert.alert("Error", e.message || "Could not create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Create listing</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to add photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={Colors.gray}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor={Colors.gray}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => {
          const isActive = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, isActive && styles.catChipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[styles.catLabel, isActive && styles.catLabelActive]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Description (optional)"
        placeholderTextColor={Colors.gray}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {loading ? (
        <ActivityIndicator color={Colors.primary} />
      ) : (
        <PrimaryButton
          title="Post listing"
          onPress={handleCreate}
          style={{ marginTop: 8 }}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: Colors.text,
  },
  imagePicker: {
    borderRadius: 16,
    backgroundColor: Colors.primarySoft,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: Colors.gray,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  catChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: "#fff",
  },
  catChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  catLabel: {
    fontSize: 12,
    color: Colors.text,
  },
  catLabelActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
});

