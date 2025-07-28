import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Film, Car, UtensilsCrossed, AlertCircle } from "lucide-react";
import type { Movie, Transport, Food, BudgetPlanResponse } from "@shared/schema";

export default function Home() {
  const [budget, setBudget] = useState<number>(1000);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [numberOfBoys, setNumberOfBoys] = useState<number>(0);
  const [numberOfGirls, setNumberOfGirls] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<BudgetPlanResponse | null>(null);

  // Auto-adjust boys and girls count when total people changes
  const adjustGroupCounts = (newTotal: number) => {
    const currentSum = numberOfBoys + numberOfGirls;
    if (currentSum > newTotal) {
      // Proportionally reduce boys and girls
      const boysRatio = numberOfBoys / currentSum;
      const newBoys = Math.floor(newTotal * boysRatio);
      const newGirls = newTotal - newBoys;
      setNumberOfBoys(newBoys);
      setNumberOfGirls(newGirls);
    }
  };

  // Calculate total estimated cost from generated plan
  const calculateTotalCost = (plan: BudgetPlanResponse | null): number => {
    if (!plan) return 0;
    
    const movieCost = (plan.movies || []).reduce((sum, movie) => sum + (movie.price * numberOfPeople), 0);
    const transportCost = (plan.transport || []).reduce((sum, transport) => sum + transport.estimatedCost, 0);
    const foodCost = (plan.food || []).reduce((sum, food) => sum + food.estimatedFoodCost, 0);
    
    return movieCost + transportCost + foodCost;
  };

  const totalEstimatedCost = calculateTotalCost(generatedPlan);
  const remainingBudget = budget - totalEstimatedCost;

  // Generate budget plan using backend API
  const generateBudgetPlan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget,
          numberOfPeople,
          numberOfBoys,
          numberOfGirls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.statusText}`);
      }

      const generatedPlan: BudgetPlanResponse = await response.json();
      setGeneratedPlan(generatedPlan);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate budget plan. Please try again.';
      setError(errorMessage);
      console.error('Error generating plan:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-4xl">🎬</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Weekend Budget Planner
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Plan your perfect weekend within budget with AI-powered smart suggestions for movies, transport, and dining
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  Total Budget (INR)
                </Label>
                <Input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  placeholder="1000"
                  min="0"
                  className="rounded-lg border-2 focus:border-blue-500 transition-colors duration-200 text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="people" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">👥</span>
                  Total People
                </Label>
                <Input
                  type="number"
                  id="people"
                  value={numberOfPeople}
                  onChange={(e) => {
                    const newTotal = Number(e.target.value);
                    setNumberOfPeople(newTotal);
                    adjustGroupCounts(newTotal);
                  }}
                  placeholder="1"
                  min="1"
                  className="rounded-lg border-2 focus:border-blue-500 transition-colors duration-200 text-lg font-medium"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="boys" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">👦</span>
                  Number of Boys
                </Label>
                <Input
                  type="number"
                  id="boys"
                  value={numberOfBoys}
                  onChange={(e) => {
                    const newBoys = Number(e.target.value);
                    if (newBoys + numberOfGirls <= numberOfPeople) {
                      setNumberOfBoys(newBoys);
                    }
                  }}
                  placeholder="0"
                  min="0"
                  max={numberOfPeople - numberOfGirls}
                  className="rounded-lg border-2 focus:border-blue-500 transition-colors duration-200 text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="girls" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">👧</span>
                  Number of Girls
                </Label>
                <Input
                  type="number"
                  id="girls"
                  value={numberOfGirls}
                  onChange={(e) => {
                    const newGirls = Number(e.target.value);
                    if (numberOfBoys + newGirls <= numberOfPeople) {
                      setNumberOfGirls(newGirls);
                    }
                  }}
                  placeholder="0"
                  min="0"
                  max={numberOfPeople - numberOfBoys}
                  className="rounded-lg border-2 focus:border-blue-500 transition-colors duration-200 text-lg font-medium"
                />
              </div>
            </div>
            
            {/* Group composition hint */}
            {numberOfPeople > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <span>ℹ️</span>
                  <span>
                    Group: {numberOfBoys + numberOfGirls} of {numberOfPeople} people specified
                    {numberOfBoys + numberOfGirls < numberOfPeople && 
                      ` (${numberOfPeople - numberOfBoys - numberOfGirls} unspecified)`
                    }
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Specifying boys and girls helps AI suggest better movies and dining options for your group.
                </p>
              </div>
            )}
            
            <Button
              onClick={generateBudgetPlan}
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <span className="text-lg">✨</span>
                  <span className="ml-2">Generate Plan</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Plan Display */}
        {generatedPlan && (
          <div className="space-y-6">
            {/* Budget Summary */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Budget Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
                      <span className="text-blue-500">💳</span>
                      Initial Budget
                    </p>
                    <p className="text-2xl font-bold text-slate-900">₹{budget.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
                      <span className="text-purple-500">🧮</span>
                      Total Estimated Cost
                    </p>
                    <p className="text-2xl font-bold text-slate-900">₹{totalEstimatedCost.toLocaleString()}</p>
                  </div>
                  <div className={`bg-gradient-to-br rounded-lg p-4 border-l-4 ${
                    remainingBudget >= 0 
                      ? 'from-emerald-50 to-emerald-100 border-emerald-500' 
                      : 'from-red-50 to-red-100 border-red-500'
                  }`}>
                    <p className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
                      <span className={remainingBudget >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                        {remainingBudget >= 0 ? '💚' : '❤️'}
                      </span>
                      Remaining Budget
                    </p>
                    <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ₹{Math.abs(remainingBudget).toLocaleString()}
                    </p>
                    {remainingBudget < 0 && (
                      <p className="text-xs text-red-500 mt-1 font-medium">⚠️ Over budget!</p>
                    )}
                    {remainingBudget > 0 && (
                      <p className="text-xs text-emerald-500 mt-1 font-medium">✅ Within budget!</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Details */}
            <div className="space-y-6">
              {/* Movies Section */}
              <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-0">
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <Film className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Movies</h3>
                        <p className="text-blue-100 text-base">Entertainment picks for your weekend</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    {generatedPlan.movies?.map((movie, index) => (
                      <div key={index} className="relative">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                          <div className="grid md:grid-cols-3 gap-6 items-start">
                            <div className="md:col-span-2">
                              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{movie.title}</h4>
                              
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="bg-blue-500 rounded-full p-2">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span className="text-base font-medium text-slate-600">Show Times:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {movie.showtimes?.map((time, timeIndex) => (
                                    <span key={timeIndex} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-2 rounded-full border-2 border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer">
                                      {time}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <span className="text-base text-slate-600">Price per ticket:</span>
                                <span className="text-xl font-bold text-slate-900">₹{movie.price}</span>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                                <p className="text-blue-100 text-sm mb-2">Total Cost</p>
                                <p className="text-sm text-blue-100 mb-1">{numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</p>
                                <p className="text-3xl font-bold">₹{(movie.price * numberOfPeople).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transport Section */}
              <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-0">
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <Car className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Transport</h3>
                        <p className="text-emerald-100 text-base">Travel options for your journey</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid gap-6">
                      {generatedPlan.transport?.map((transport, index) => (
                        <div key={index} className="group/item relative">
                          <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 shadow-lg">
                                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-slate-900 group-hover/item:text-emerald-700 transition-colors mb-2">{transport.method}</h4>
                                  <p className="text-base text-slate-500">Recommended travel option</p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border group-hover/item:shadow-md transition-shadow">
                                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Estimated Cost</p>
                                  <p className="text-3xl font-bold text-emerald-600">₹{transport.estimatedCost.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Food Section */}
              <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-0">
                  <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <UtensilsCrossed className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Food & Dining</h3>
                        <p className="text-orange-100 text-base">Culinary experiences for your weekend</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid gap-6">
                      {generatedPlan.food?.map((food, index) => (
                        <div key={index} className="group/item relative">
                          <div className="bg-gradient-to-r from-slate-50 to-orange-50/30 rounded-2xl p-6 border border-slate-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-4 shadow-lg">
                                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-slate-900 group-hover/item:text-orange-700 transition-colors mb-2">{food.restaurantType}</h4>
                                  <div className="flex items-center gap-3">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                      ))}
                                    </div>
                                    <span className="text-base text-slate-500">Highly recommended</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border group-hover/item:shadow-md transition-shadow">
                                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Estimated Cost</p>
                                  <p className="text-3xl font-bold text-orange-600">₹{food.estimatedFoodCost.toLocaleString()}</p>
                                  <div className="flex items-center gap-2 mt-3 justify-end">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-sm text-green-600 font-medium">Budget friendly</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!generatedPlan && !loading && !error && (
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Ready to Plan Your Weekend?</h3>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                Enter your budget and number of people, then click "Generate Plan" to get personalized AI-powered suggestions for movies, transport, and dining.
              </p>
              <div className="mt-6 flex justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <span>🎬</span> Movies
                </span>
                <span className="flex items-center gap-1">
                  <span>🚗</span> Transport
                </span>
                <span className="flex items-center gap-1">
                  <span>🍽️</span> Dining
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
