export function toggleFavorite(ids:string[],id:string) { return ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]; }
export function restoreFavorites(raw:string|null,knownIds:string[]):string[] {
  try { const value:unknown=JSON.parse(raw??'[]'); return Array.isArray(value)?[...new Set(value.filter((x):x is string=>typeof x==='string' && knownIds.includes(x)))]:[]; }
  catch { return []; }
}
