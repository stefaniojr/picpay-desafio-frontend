import { TaskModel } from "./task-model";

export interface SearchResultModel {
  tasks: TaskModel[];
  total: number;
}

export interface SortStateModel {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

export interface SortEventModel {
  active: SortColumn;
  direction: SortDirection;
}

export type SortColumn = keyof TaskModel | "";
export type SortDirection = "asc" | "desc" | "";
