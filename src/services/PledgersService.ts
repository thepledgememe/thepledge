import { SupabaseClient } from "@supabase/supabase-js";
import { FetchPledgersParams, PledgersResponse } from "../interface/Pledger";

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
            `broken_hash, broken_timestamp`,
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
}
