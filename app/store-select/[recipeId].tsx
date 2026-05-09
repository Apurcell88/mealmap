import { stores } from "@/data/stores";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function StoreSelectScreen() {
  const { recipeId } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Text style={styles.heading}>Choose a store</Text>
      <Text style={styles.subheading}>
        Pick where you want to shop for this recipe.
      </Text>

      <View style={styles.storeList}>
        {stores.map((store) => (
          <Pressable
            key={store.id}
            style={styles.storeCard}
            onPress={() =>
              router.push({
                pathname: "/shopping-list/[recipeId]/[storeId]",
                params: {
                  recipeId: String(recipeId),
                  storeId: store.id,
                },
              })
            }
          >
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeLocation}>{store.location}</Text>
            <Text style={styles.storeDistance}>{store.distanceMiles} miles away</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },

  backButton: {
    marginTop: 56,
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },

  heading: {
    fontSize: 34,
    fontWeight: "900",
    color: "#18181b",
    letterSpacing: -1,
  },

  subheading: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 23,
    color: "#71717a",
  },

  storeList: {
    marginTop: 24,
    gap: 16,
  },

  storeCard: {
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  storeName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#18181b",
  },

  storeLocation: {
    marginTop: 6,
    fontSize: 15,
    color: "#52525b",
  },

  storeDistance: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "800",
    color: "#16a34a",
  },
});