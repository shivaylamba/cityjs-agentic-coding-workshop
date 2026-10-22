import type { FiltersProps } from '../types';
export function Filters({value,onChange}:FiltersProps) {
  return <div className="filters"><div><label htmlFor="title-search">Search titles</label><input id="title-search" value={value.query} onChange={e=>onChange({...value,query:e.target.value})}/></div><div><label htmlFor="room-filter">Room</label><select id="room-filter" value={value.room} onChange={e=>onChange({...value,room:e.target.value})}><option value="">All rooms</option><option>Athena</option><option>Hermes</option></select></div></div>;
}
