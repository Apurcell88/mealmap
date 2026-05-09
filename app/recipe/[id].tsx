import { recipes } from "@/data/recipes";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.heroIcon}>🍽️</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.cuisine}>{recipe.cuisine}</Text>
          <Text style={styles.rating}>⭐ {recipe.ratingAverage}</Text>
        </View>

        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${recipe.estimatedPricePerServing}</Text>
            <Text style={styles.statLabel}>per serving</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalTime}</Text>
            <Text style={styles.statLabel}>minutes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{recipe.servings}</Text>
            <Text style={styles.statLabel}>servings</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>

        <View style={styles.sectionCard}>
          {recipe.ingredients.map((ing) => (
            <View key={ing.id} style={styles.ingredientRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.ingredientText}>
                {ing.quantity} {ing.unit} {ing.name}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
  style={styles.chooseStoreButton}
  onPress={() =>
    router.push({
      pathname: "/store-select/[recipeId]",
      params: { recipeId: recipe.id },
    })
  }
>
  <Text style={styles.chooseStoreButtonText}>Choose Store</Text>
</Pressable>

        <Text style={styles.sectionTitle}>Instructions</Text>

        <View style={styles.sectionCard}>
          {recipe.instructions.map((step) => (
            <View key={step.stepNumber} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  backButton: {
    marginTop: 56,
    marginLeft: 20,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },
  hero: {
    height: 210,
    marginHorizontal: 20,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcfce7",
  },
  heroIcon: {
    fontSize: 72,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  cuisine: {
    fontSize: 13,
    fontWeight: "800",
    color: "#16a34a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  rating: {
    fontSize: 15,
    fontWeight: "800",
    color: "#18181b",
  },
  title: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: "900",
    color: "#18181b",
    letterSpacing: -1,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#52525b",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#18181b",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#71717a",
    textTransform: "uppercase",
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "900",
    color: "#18181b",
  },
  chooseStoreButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#16a34a",
    alignItems: "center",
  },
  chooseStoreButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  sectionCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  ingredientRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 18,
    color: "#16a34a",
    fontWeight: "900",
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#3f3f46",
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "#ffffff",
    fontWeight: "900",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    color: "#3f3f46",
  },
});