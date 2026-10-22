import type { Session } from './types';
export function valid(s: Session) { return Number.isInteger(s.startMinute) && Number.isInteger(s.endMinute) && s.startMinute >= 0 && s.endMinute <= 1440 && s.startMinute < s.endMinute; }
export function overlaps(a: Session, b: Session) { return a.startMinute < b.endMinute && b.startMinute < a.endMinute; }
export function addSession(ids: string[], id: string, catalog: Session[]) {
  const next=catalog.find(s=>s.id===id);
  if(!next || !valid(next)) return {ids,error:'Unknown or invalid session.'};
  if(!next.available) return {ids,error:'This session is full.'};
  if(ids.includes(id)) return {ids,error:'Already in your agenda.'};
  if(catalog.some(s=>ids.includes(s.id) && overlaps(next,s))) return {ids,error:'Time clash. Your agenda is unchanged.'};
  return {ids:[...ids,id],error:''};
}
export function restoreAgenda(raw: string|null,catalog: Session[]): string[] {
  try { const parsed:unknown=JSON.parse(raw??'[]'); if(!Array.isArray(parsed))return [];
    return parsed.reduce<string[]>((ids,id)=>typeof id==='string'?addSession(ids,id,catalog).ids:ids,[]);
  } catch { return []; }
}
export function time(n:number) { return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`; }
