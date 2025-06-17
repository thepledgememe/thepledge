import { SupabaseClient } from "@supabase/supabase-js";
import {
  FetchPledgersParams,
  PledgerCount,
  PledgerCountsResponse,
  PledgersResponse,
  TotalPledged,
  TotalPledgedResponse,
} from "../interface/Pledger";

const GRAPHQL_URL =
  "https://api.studio.thegraph.com/query/13281/pledge/version/latest";

const PLEDGERS_COUNT_QUERY = (startDate?: string, endDate?: string) => `{
  pledgerCounts(where: {
    updatedAt_gte: ${startDate ? Math.floor(new Date(startDate).getTime() / 1000) : "null"},
    updatedAt_lte: ${endDate ? Math.floor(new Date(endDate).getTime() / 1000) : "null"}
  }) {
    id
    count
    updatedAt
  }
}`;

export class PledgersService {
  constructor(private supabase: SupabaseClient) {}

  async fetchPledgers(params: FetchPledgersParams): Promise<PledgersResponse> {
    try {
      const limit = params.limit || 100;
      const offset = params.offset || 0;

      const query = this.supabase
        .from("PledgerData")
        .select(
          `wallet, name, twitter, pledged, balance, status, updated_at, last_pledged_at_timestamp,` +
            `first_pledged_at_timestamp, broken_hash, broken_timestamp`,
          { count: "exact" },
        )
        .neq("status", "");
      if (params.key) {
        query.or(
          `name.ilike.%${params.key}%,wallet.ilike.%${params.key}%,twitter.ilike.%${params.key}%`,
        );
      }
      if (params.status) {
        query.eq("status", params.status);
      } else {
        query.neq("status", "inactive");
      }
      if (params.sort) {
        query.order(params.sort.key, {
          ascending: params.sort.direction === "asc",
        });
      }
      // Fetch data using Supabase client
      const {
        data: dataRaw,
        error,
        count,
      } = await query.range(offset, offset + limit - 1);
      const data = (dataRaw || []) as any[];

      if (error) {
        throw new Error(error.message || "Failed to fetch pledgers");
      }

      // Transform response data
      return {
        data:
          data.map((rawData) => ({
            wallet: rawData.wallet,
            name: rawData.name,
            twitter: rawData.twitter,
            pledged: rawData.pledged,
            balance: rawData.balance,
            status: rawData.status,
            updatedAt: rawData.updated_at,
            brokenHash: rawData.broken_hash,
            brokenTimestamp: rawData.broken_timestamp,
            lastPledgedAtTimestamp: rawData.last_pledged_at_timestamp,
            firstPledgedAtTimestamp: rawData.first_pledged_at_timestamp,
            createdAt: rawData.created_at,
          })) || [],
        total: count || 0,
      };
    } catch (error: any) {
      console.error("Error fetching pledgers:", error.message);
      throw new Error(
        error.message || "An unknown error occurred while fetching pledgers",
      );
    }
  }

  async getPledgerCounts(
    startDate?: string,
    endDate?: string,
  ): Promise<PledgerCount[]> {
    try {
      const query = PLEDGERS_COUNT_QUERY(startDate, endDate);
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching pledger counts: ${response.statusText}`,
        );
      }

      const result: PledgerCountsResponse = await response.json();
      const parsedData = result.data.pledgerCounts.map((t) => ({
        ...t,
        updatedAt: new Date(parseInt(t.updatedAt) * 1000),
      }));
      return parsedData.filter((t) => t.id.toString() !== "1");
    } catch (error) {
      console.error("Failed to fetch pledger counts:", error);
      throw error;
    }
  }

  async getTotalPledged(start?: Date, end?: Date): Promise<TotalPledged[]> {
    try {
      const startCondition = start ? 'updatedAt_gte: $startDate' : '';
      const endCondition = end ? 'updatedAt_lte: $endDate' : '';
      const whereConditions = [startCondition, endCondition, 'id_not: "1"']
        .filter(Boolean)
        .join(', ');

      const query = `
        query($startDate: Int, $endDate: Int) {
          totalPledgeds(
            orderBy: updatedAt
            orderDirection: asc
            where: {
              ${whereConditions}
            }
            first: 1000
          ) {
            id
            total
            updatedAt
          }
        }
      `;

      const variables: any = {};
      if (start) variables.startDate = Math.floor(start.getTime() / 1000);
      if (end) variables.endDate = Math.floor(end.getTime() / 1000);

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching total pledged data: ${response.statusText}`,
        );
      }

      const result: TotalPledgedResponse = await response.json();
      const parsedData = result.data.totalPledgeds.map((t) => ({
        ...t,
        updatedAt: new Date(parseInt(t.updatedAt) * 1000),
      }));
      return parsedData.filter((t) => t.id.toString() !== "1");
    } catch (error) {
      console.error("Failed to fetch total pledged data:", error);
      throw error;
    }
  }
}
