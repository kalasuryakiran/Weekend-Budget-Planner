import type { Express } from "express";
import { createServer, type Server } from "http";
import { GoogleGenAI } from "@google/genai";
import { budgetPlanRequestSchema, budgetPlanResponseSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // Generate budget plan endpoint
  app.post("/api/generate-plan", async (req, res) => {
    try {
      // Validate request body
      const validatedData = budgetPlanRequestSchema.parse(req.body);
      const { budget, numberOfPeople, numberOfBoys = 0, numberOfGirls = 0 } = validatedData;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Google Gemini API key is not configured" 
        });
      }

      // Build group composition description
      let groupDescription = `${numberOfPeople} people`;
      if (numberOfBoys > 0 && numberOfGirls > 0) {
        groupDescription += ` (${numberOfBoys} boys and ${numberOfGirls} girls)`;
      } else if (numberOfBoys > 0) {
        groupDescription += ` (${numberOfBoys} boys)`;
      } else if (numberOfGirls > 0) {
        groupDescription += ` (${numberOfGirls} girls)`;
      }

      const prompt = `You are a weekend budget planner. Generate a weekend budget plan for ${groupDescription} with a total budget of ${budget} INR.

Group composition: ${groupDescription}

Based on the group composition, please provide personalized suggestions for:
- Movies: Exactly 1 movie title suitable for this group, with each ticket costing exactly 350 INR. Include exactly 3 different realistic showtimes.
- Transport: 1-2 transport methods with estimated costs
- Restaurants: 1 restaurant type suitable for this group with estimated food cost

IMPORTANT: 
- Consider the group's demographics when suggesting movies and dining options
- For mixed groups, suggest movies and restaurants that appeal to both boys and girls
- For boys-only groups, suggest action/adventure movies and casual dining
- For girls-only groups, suggest romantic/drama movies and nice cafes or restaurants
- Ensure the total estimated cost for movies, transport, and food does NOT exceed ${budget} INR

Return ONLY a JSON object in this exact format:
{
  "movies": [{"title": "Movie Name", "price": 350, "showtimes": ["2:00 PM", "5:00 PM", "8:00 PM"]}],
  "transport": [{"method": "Transport Method", "estimatedCost": 100}],
  "food": [{"restaurantType": "Restaurant Type", "estimatedFoodCost": 400}]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("No response from Gemini API");
      }

      // Parse JSON from response
      const cleanedText = response.text.replace(/```json\n?|\n?```/g, '').trim();
      const parsedPlan = JSON.parse(cleanedText);
      
      // Validate the response structure
      const validatedPlan = budgetPlanResponseSchema.parse(parsedPlan);

      // Enforce 350 INR movie price client-side
      if (validatedPlan.movies) {
        validatedPlan.movies = validatedPlan.movies.map(movie => ({
          ...movie,
          price: 350
        }));
      }

      res.json(validatedPlan);
    } catch (error) {
      console.error('Error generating budget plan:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: error.message
        });
      }
      
      res.status(500).json({ 
        error: "Failed to generate budget plan. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
