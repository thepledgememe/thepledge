export interface Pledger {
  wallet: string;
  name?: string;
  twitter?: string;
  balance?: string;
  pledged?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  lastPledgedAtTimestamp?: string;
  firstPledgedAtTimestamp?: string;
  brokenHash?: string;
  brokenTimestamp?: string;
}

export interface PledgersResponse {
  data: Pledger[];
  total: number;
}

export interface PledgerCount {
  id: string;
  count: string;
  updatedAt: Date;
}

export interface PledgerCountsResponse {
  data: {
    pledgerCounts: (PledgerCount & { updatedAt: string })[];
  };
}

export interface FetchPledgersParams {
  key?: string; // Filter key for wallet, name, or twitter
  status?: string; // Filter by status
  limit?: number; // Number of records per page
  offset?: number; // Starting index for pagination
  sort?: { key: string; direction: string }; // Sort by column
}

export interface TotalPledged {
  id: string;
  total: string;
  updatedAt: Date;
}

export interface TotalPledgedResponse {
  data: {
    totalPledgeds: (TotalPledged & { updatedAt: string })[];
  };
}
