export type FindManyProps = {
  take: number;
  skip: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'asc' | 'DESC' | 'desc';
};
