export type Session = { id: string; title: string; room: string; startMinute: number; endMinute: number; available: boolean };
export type FilterValue = { query: string; room: string };
export type FiltersProps = { value: FilterValue; onChange(next: FilterValue): void };
export type FavoritesProps = { count: number; only: boolean; onOnlyChange(next: boolean): void };
