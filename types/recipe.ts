export type Recipe = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;

    cuisine: string;
    tags: string[];

    servings: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;

    difficulty: 'easy' | 'medium' | 'hard';

    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];

    ratingAverage: number;
    ratingCount: number;

    estimatedPricePerServing: number;
}

export type RecipeIngredient = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    category: string;
}

export type RecipeInstruction = {
    stepNumber: number;
    text: string;
}