import { Recipe } from "@/types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Chicken Alfredo",
    description: "Creamy pasta with chicken, parmesan, and garlic.",
    cuisine: "Italian",
    tags: ["pasta", "chicken", "comfort food"],
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    difficulty: "easy",
    ingredients: [
      {
        id: "1",
        name: "Chicken breast",
        quantity: 1,
        unit: "lb",
        category: "meat",
      },
      {
        id: "2",
        name: "Fettuccine",
        quantity: 12,
        unit: "oz",
        category: "pasta",
      },
      {
        id: "3",
        name: "Heavy cream",
        quantity: 1,
        unit: "cup",
        category: "dairy",
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        text: "Cook pasta according to package directions.",
      },
      {
        stepNumber: 2,
        text: "Cook chicken in a skillet until browned and fully cooked.",
      },
      {
        stepNumber: 3,
        text: "Combine pasta, chicken, cream, and parmesan.",
      },
    ],
    ratingAverage: 4.6,
    ratingCount: 128,
    estimatedPricePerServing: 3.72,
  },
];