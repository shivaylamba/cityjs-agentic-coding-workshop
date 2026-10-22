import type { Session, FilterValue } from './types';
export function filterSessions(sessions:Session[],value:FilterValue) {
  return sessions.filter(s=>(!value.room || s.room===value.room) && s.title.toLocaleLowerCase().includes(value.query.trim().toLocaleLowerCase()));
}
