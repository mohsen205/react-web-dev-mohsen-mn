export interface FilterInt {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  categories?: string;
  q?: string;
}
