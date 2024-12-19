export interface Pledger {
  wallet: string;
  name?: string;
  twitter?: string;
  balance?: string;
  pledged?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PledgersResponse {
  data: Pledger[];
  total: number;
}

export interface FetchPledgersParams {
  key?: string; // Filter key for wallet, name, or twitter
  status?: string; // Filter by status
  limit?: number; // Number of records per page
  offset?: number; // Starting index for pagination
}
