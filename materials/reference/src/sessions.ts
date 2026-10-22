import type { Session } from './types';
// Fictional programme, not the real CityJS schedule. Europe/Athens local minutes.
export const sessions: Session[] = [
  { id:'loop',title:'Opening the agent loop',room:'Athena',startMinute:540,endMinute:570,available:true },
  { id:'choices',title:'Concurrent choices',room:'Hermes',startMinute:555,endMinute:585,available:true },
  { id:'spec',title:'Spec clinic',room:'Athena',startMinute:570,endMinute:600,available:true },
  { id:'review',title:'Review before release',room:'Hermes',startMinute:600,endMinute:630,available:true },
  { id:'full',title:'The sold-out session',room:'Athena',startMinute:630,endMinute:660,available:false },
  { id:'ship',title:'Ship it, "carefully" — Αθήνα',room:'Hermes',startMinute:660,endMinute:690,available:true }
];
