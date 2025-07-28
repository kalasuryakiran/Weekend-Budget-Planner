import { z } from "zod";

// Budget plan request schema
export const budgetPlanRequestSchema = z.object({
  budget: z.number().min(1, "Budget must be at least 1 INR"),
  numberOfPeople: z.number().min(1, "Number of people must be at least 1"),
  numberOfBoys: z.number().min(0, "Number of boys must be at least 0").optional(),
  numberOfGirls: z.number().min(0, "Number of girls must be at least 0").optional(),
});

// Budget plan response schemas
export const movieSchema = z.object({
  title: z.string(),
  price: z.number(),
  showtimes: z.array(z.string()).min(1).max(3),
});

export const transportSchema = z.object({
  method: z.string(),
  estimatedCost: z.number(),
});

export const foodSchema = z.object({
  restaurantType: z.string(),
  estimatedFoodCost: z.number(),
});

export const budgetPlanResponseSchema = z.object({
  movies: z.array(movieSchema),
  transport: z.array(transportSchema),
  food: z.array(foodSchema),
});

// Types
export type BudgetPlanRequest = z.infer<typeof budgetPlanRequestSchema>;
export type Movie = z.infer<typeof movieSchema>;
export type Transport = z.infer<typeof transportSchema>;
export type Food = z.infer<typeof foodSchema>;
export type BudgetPlanResponse = z.infer<typeof budgetPlanResponseSchema>;
