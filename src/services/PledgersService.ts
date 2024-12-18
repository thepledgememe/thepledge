import { FetchPledgersParams, PledgersResponse } from "../interface/Pledger";

export class PledgersService {
  constructor(private url: string) {}

  async fetchPledgers(params: FetchPledgersParams): Promise<PledgersResponse> {
    try {
      // Construct URL with query parameters
      const queryParams = new URLSearchParams(params as any).toString();
      const fullUrl = `${this.url}?${queryParams}`;

      const response = await fetch(fullUrl, {
        method: "GET", // Use GET for fetching data
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch pledgers");
      }

      return response.json();
    } catch (error: any) {
      console.error("Error fetching pledgers:", error.message);
      throw new Error(
        error.message || "An unknown error occurred while fetching pledgers"
      );
    }
  }
}
