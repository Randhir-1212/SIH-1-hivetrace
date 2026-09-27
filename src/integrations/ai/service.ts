export class AIService {
  private apiKey: string | undefined;
  public isDemoMode: boolean = false;

  constructor() {
    this.apiKey = process.env.AI_PROVIDER_API_KEY;
    if (!this.apiKey) {
      console.warn('[AIService] Missing AI_PROVIDER_API_KEY. Operating in DEMO MODE.');
      this.isDemoMode = true;
    }
  }

  public async analyzeHiveImage(imageUrl: string): Promise<{
    confidence: number;
    results: any;
  }> {
    if (this.isDemoMode) {
      return {
        confidence: 0.85,
        results: {
          observations: "Healthy activity observed. No visible signs of varroa mites or other pests. Comb structure appears normal.",
          warnings: [],
          recommendation: "Continue routine monitoring."
        }
      };
    }
    
    // In production, implement actual AI call (e.g. OpenAI Vision API)
    throw new Error("AI provider integration not fully implemented for production yet. Set AI_PROVIDER_API_KEY to null to use demo mode.");
  }

  public async analyzePurity(testValues: any): Promise<{
    anomalies: string[];
    explanation: string;
    recommendation: string;
    confidence: number;
  }> {
    if (this.isDemoMode) {
      const anomalies = [];
      if (testValues.moisturePct > 20) anomalies.push("High moisture content detected.");
      if (testValues.hmf_mg_kg > 40) anomalies.push("Elevated HMF indicates overheating or aging.");

      return {
        anomalies,
        explanation: anomalies.length > 0 ? "Potential issues detected based on standard parameters." : "All parameters fall within expected natural honey ranges.",
        recommendation: anomalies.length > 0 ? "Review test results manually." : "Approved",
        confidence: 0.95
      };
    }

    throw new Error("AI provider integration not fully implemented for production yet.");
  }
}

export const aiService = new AIService();
