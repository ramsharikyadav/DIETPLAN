import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface WorkoutPlan {
  title: string;
  summary: string;
  warmup: Exercise[];
  cardio: Exercise[];
  strength: Exercise[];
  cooldown: Exercise[];
}

export interface Exercise {
  name: string;
  description: string;
  sets?: number;
  reps?: string;
  duration?: string;
  intensity?: string;
}

export async function generateWorkout(preferences: {
  level: string;
  goal: string;
  equipment: string[];
  duration: number;
}): Promise<WorkoutPlan> {
  const prompt = `Generate a personalized daily workout plan for a user with the following profile:
  - Fitness Level: ${preferences.level}
  - Primary Goal: ${preferences.goal}
  - Available Equipment: ${preferences.equipment.join(", ")}
  - Total Workout Duration: ${preferences.duration} minutes

  The plan must include:
  1. A warm-up (5-10 mins)
  2. A cardio section
  3. A strength section (using available equipment)
  4. A cool-down (5 mins)

  Specify sets, reps, and duration for each exercise where applicable.
  Return the response in a structured JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          warmup: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
              },
              required: ["name", "description"],
            },
          },
          cardio: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                intensity: { type: Type.STRING },
              },
              required: ["name", "description"],
            },
          },
          strength: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                sets: { type: Type.INTEGER },
                reps: { type: Type.STRING },
              },
              required: ["name", "description"],
            },
          },
          cooldown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
              },
              required: ["name", "description"],
            },
          },
        },
        required: ["title", "summary", "warmup", "cardio", "strength", "cooldown"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as WorkoutPlan;
  } catch (e) {
    console.error("Failed to parse workout plan", e);
    throw new Error("Failed to generate a valid workout plan.");
  }
}
