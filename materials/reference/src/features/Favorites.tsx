import type { FavoritesProps } from '../types';
export function Favorites({count,only,onOnlyChange}:FavoritesProps) {
  return <label className="favorite-filter"><input type="checkbox" checked={only} onChange={e=>onOnlyChange(e.target.checked)}/> Favorites only ({count})</label>;
}
