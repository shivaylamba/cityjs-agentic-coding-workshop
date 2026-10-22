import { useState } from 'react';
import { sessions } from './sessions';
import { addSession, restoreAgenda, time } from './domain';
import { toggleFavorite,restoreFavorites } from './favorites';
import { filterSessions } from './filter';
import { exportAgenda,downloadAgenda } from './export';
import { Filters } from './features/Filters';
import { Favorites } from './features/Favorites';
const agendaKey='cityjs-agenda-v1',favoriteKey='cityjs-favorites-v1';
function read(key:string) { try{return localStorage.getItem(key);}catch{return null;} }
export default function App() {
  const [ids,setIds]=useState(()=>restoreAgenda(read(agendaKey),sessions));
  const [favorites,setFavorites]=useState(()=>restoreFavorites(read(favoriteKey),sessions.map(s=>s.id)));
  const [filter,setFilter]=useState({query:'',room:''}),[only,setOnly]=useState(false),[notice,setNotice]=useState('');
  const selected=sessions.filter(s=>ids.includes(s.id));
  const visible=filterSessions(sessions,filter).filter(s=>!only || favorites.includes(s.id));
  function save(key:string,value:string[]) {try{localStorage.setItem(key,JSON.stringify(value));}catch{setNotice('Changes work for this visit; browser storage is unavailable.');}}
  function add(id:string) {const next=addSession(ids,id,sessions);setIds(next.ids);setNotice(next.error||'Added to your personal agenda.');save(agendaKey,next.ids);}
  function remove(id:string) {const next=ids.filter(x=>x!==id);setIds(next);setNotice('Removed.');save(agendaKey,next);}
  function favorite(id:string) {const next=toggleFavorite(favorites,id);setFavorites(next);save(favoriteKey,next);}
  return <><header><p>CityJS · Workshop reference</p><h1>Your next three hours,<br/>by design.</h1><p>Fictional sessions. Personal agenda. No reservations.</p></header><main><section aria-label="Session catalog"><h2>Explore the programme</h2><Filters value={filter} onChange={setFilter}/><Favorites count={favorites.length} only={only} onOnlyChange={setOnly}/>{!visible.length&&<p>No sessions match.</p>}<div className="cards">{visible.map(s=><article key={s.id}><small>{time(s.startMinute)}–{time(s.endMinute)} · {s.room}</small><h3>{s.title}</h3><p>{s.available?'Available in this fictional demo':'Full'}</p><button onClick={()=>add(s.id)}>Add {s.title}</button><button aria-label={`Favorite ${s.title}`} aria-pressed={favorites.includes(s.id)} onClick={()=>favorite(s.id)}>{favorites.includes(s.id)?'★ Saved':'☆ Favorite'}</button></article>)}</div></section><aside aria-label="Personal agenda"><h2>Your agenda ({ids.length})</h2><p role="status">{notice}</p>{!selected.length&&<p>No sessions selected yet.</p>}{selected.sort((a,b)=>a.startMinute-b.startMinute).map(s=><article key={s.id}><h3>{s.title}</h3><p>{time(s.startMinute)}–{time(s.endMinute)} · {s.room}</p><button onClick={()=>remove(s.id)}>Remove {s.title}</button></article>)}<button onClick={()=>{const text=exportAgenda(selected);if(!text){setNotice('Add a session before exporting.');return;}downloadAgenda(text);setNotice('Agenda exported.');}}>Export agenda</button><p className="fine">Saved in this browser only. A new browser or device starts with a separate agenda.</p></aside></main></>;
}
