import { recipes } from "@/data/recipe";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MealMap</Text>
      <Text style={styles.subheading}>Find meals by cost, time, and store.</Text>

      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>⭐ {item.ratingAverage}</Text>
              <Text style={styles.meta}>🍽 {item.servings} servings</Text>
              <Text style={styles.meta}>${item.estimatedPricePerServing}/serving</Text>
            </View>

            <Text style={styles.time}>
              {item.prepTimeMinutes + item.cookTimeMinutes} mins total
            </Text>
          </Pressable>
        )}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 40,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },
  list: {
    gap: 16,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    marginTop: 6,
    fontSize: 15,
    color: "#555",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  meta: {
    fontSize: 14,
    fontWeight: "600",
  },
  time: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});