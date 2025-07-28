// For the Weekend Budget Planner, we don't need persistent storage
// since all budget plans are ephemeral and generated on-demand
// This file can be simplified or removed in future versions

export interface IStorage {
  // No storage methods needed for budget planner
  // All data is generated dynamically via AI
}

export class MemStorage implements IStorage {
  constructor() {
    // No data to store for budget planner
  }
}

export const storage = new MemStorage();
