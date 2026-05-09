import { recipes } from "@/data/recipe";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const filters = [
  "All",
  "Budget",
  "Under 30 Min",
  "High Protein",
  "Comfort Food",
];

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredRecipes = useMemo(() => {
    switch (selectedFilter) {
      case "Budget":
        return recipes.filter(
          (recipe) => recipe.estimatedPricePerServing < 5
        );

      case "Under 30 Min":
        return recipes.filter(
          (recipe) =>
            recipe.prepTimeMinutes + recipe.cookTimeMinutes < 30
        );

      case "High Protein":
        return recipes.filter((recipe) =>
          recipe.tags.includes("high protein")
        );

      case "Comfort Food":
        return recipes.filter((recipe) =>
          recipe.tags.includes("comfort food")
        );

      default:
        return recipes;
    }
  }, [selectedFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MealMap</Text>

      <Text style={styles.heading}>What do you want to cook?</Text>

      <Text style={styles.subheading}>
        Find meals by cost, time, ingredients, and store.
      </Text>

      <ScrollView
        horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.filterScroll}
  contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter;

          return (
            <Pressable
              key={filter}
              style={[
                styles.filterChip,
                isSelected && styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        style={{ marginTop: 12 }}
        data={filteredRecipes}
        keyExtractor={(recipe) => recipe.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/recipe/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>🍽️</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.topRow}>
                <Text style={styles.cuisine}>{item.cuisine}</Text>
                <Text style={styles.rating}>⭐ {item.ratingAverage}</Text>
              </View>

              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>
                    ${item.estimatedPricePerServing}/serving
                  </Text>
                </View>

                <View style={styles.pill}>
                  <Text style={styles.pillText}>
                    {item.prepTimeMinutes + item.cookTimeMinutes} min
                  </Text>
                </View>

                <View style={styles.pill}>
                  <Text style={styles.pillText}>
                    {item.servings} servings
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fafafa",
  },


  logo: {
    marginTop: 56,
    fontSize: 18,
    fontWeight: "800",
    color: "#16a34a",
  },

  heading: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "800",
    color: "#18181b",
    letterSpacing: -0.8,
  },

  subheading: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: "#71717a",
  },

  filterContainer: {
    gap: 10,
    paddingTop: 18,
    marginBottom: 16,
    alignItems: 'center',
  },

  filterScroll: {
    maxHeight: 64,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#e4e4e7",
    height: 42,
    justifyContent: "center",
  },

  selectedFilterChip: {
    backgroundColor: "#16a34a",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3f3f46",
  },

  selectedFilterText: {
    color: "#ffffff",
  },

  list: {
    paddingTop: 16,
    paddingBottom: 32,
    gap: 18,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  imagePlaceholder: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcfce7",
  },

  imageText: {
    fontSize: 54,
  },

  cardContent: {
    padding: 18,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cuisine: {
    fontSize: 13,
    fontWeight: "800",
    color: "#16a34a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  rating: {
    fontSize: 14,
    fontWeight: "700",
    color: "#18181b",
  },

  title: {
    marginTop: 10,
    fontSize: 23,
    fontWeight: "800",
    color: "#18181b",
  },

  description: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    color: "#52525b",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#f4f4f5",
  },

  pillText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3f3f46",
  },
});