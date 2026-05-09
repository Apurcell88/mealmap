import { recipes } from "@/data/recipes";
import { stores } from "@/data/stores";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function ShoppingListScreen() {
  const { recipeId, storeId } = useLocalSearchParams();

  const recipe = recipes.find((r) => r.id === recipeId);
  const store = stores.find((s) => s.id === storeId);

  if (!recipe || !store) {
    return (
      <View style={styles.container}>
        <Text>Shopping list not found.</Text>
      </View>
    );
  }

  const estimatedTotal = recipe.estimatedPricePerServing * recipe.servings;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleItem = (ingredientId: string) => {
    setCheckedItems((current) =>
        current.includes(ingredientId)
        ? current.filter((id) => id !== ingredientId)
        : [...current, ingredientId]
    );
  };

const checkedCount = checkedItems.length;
const totalItems = recipe.ingredients.length;

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Text style={styles.heading}>Shopping List</Text>

      <Text style={styles.subheading}>
        {recipe.title} at {store.name}
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Estimated total</Text>
        <Text style={styles.summaryValue}>${estimatedTotal.toFixed(2)}</Text>
        <Text style={styles.summaryMeta}>
          ${recipe.estimatedPricePerServing.toFixed(2)} per serving • {recipe.servings} servings
        </Text>
      </View>

      <Text style={styles.progressText}>
        {checkedCount} of {totalItems} items checked
      </Text>

      <Text style={styles.sectionTitle}>Items to buy</Text>

      <View style={styles.listCard}>
        {recipe.ingredients.map((ingredient) => {
  const isChecked = checkedItems.includes(ingredient.id);

  return (
    <Pressable
      key={ingredient.id}
      style={styles.itemRow}
      onPress={() => toggleItem(ingredient.id)}
    >
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>

      <View style={styles.itemContent}>
        <Text style={[styles.itemName, isChecked && styles.itemNameChecked]}>
          {ingredient.name}
        </Text>

        <Text style={[styles.itemAmount, isChecked && styles.itemAmountChecked]}>
          {ingredient.quantity} {ingredient.unit} • {ingredient.category}
        </Text>
      </View>
    </Pressable>
  );
})}
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
    color: "#71717a",
  },

  summaryCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#dcfce7",
  },

  summaryLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#166534",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  summaryValue: {
    marginTop: 8,
    fontSize: 36,
    fontWeight: "900",
    color: "#14532d",
  },

  summaryMeta: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "900",
    color: "#18181b",
  },

  listCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#16a34a",
  },

  itemContent: {
    flex: 1,
  },

  itemName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#18181b",
  },

  itemAmount: {
    marginTop: 4,
    fontSize: 14,
    color: "#71717a",
  },
  progressText: {
  marginTop: 14,
  fontSize: 15,
  fontWeight: "800",
  color: "#16a34a",
},

checkboxChecked: {
  backgroundColor: "#16a34a",
  alignItems: "center",
  justifyContent: "center",
},

checkmark: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "900",
},

itemNameChecked: {
  color: "#a1a1aa",
  textDecorationLine: "line-through",
},

itemAmountChecked: {
  color: "#a1a1aa",
  textDecorationLine: "line-through",
},
});