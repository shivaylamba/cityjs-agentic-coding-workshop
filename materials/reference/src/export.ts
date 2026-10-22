import type { Session } from './types';
import { time } from './domain';
export function exportAgenda(sessions:Session[]) {
  if(!sessions.length)return '';
  return 'CityJS personal agenda (fictional)\n'+[...sessions].sort((a,b)=>a.startMinute-b.startMinute || a.id.localeCompare(b.id)).map(s=>`${time(s.startMinute)}–${time(s.endMinute)} | ${s.title} | ${s.room}`).join('\n')+'\n';
}
export function downloadAgenda(text:string) {
  if(!text)return;
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a'); a.href=url;a.download='cityjs-agenda.txt';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
