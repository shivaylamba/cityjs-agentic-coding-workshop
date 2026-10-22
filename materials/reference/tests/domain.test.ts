import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sessions } from '../src/sessions';
import { addSession,overlaps,restoreAgenda,valid } from '../src/domain';
import { filterSessions } from '../src/filter';
import { toggleFavorite,restoreFavorites } from '../src/favorites';
import { exportAgenda } from '../src/export';
test('back-to-back sessions are allowed; overlapping different rooms are rejected',()=>{
 assert.equal(overlaps(sessions[0],sessions[2]),false);
 assert.equal(addSession(['loop'],'spec',sessions).error,'');
 assert.match(addSession(['loop'],'choices',sessions).error,/clash/);
 assert.deepEqual(addSession(['loop'],'choices',sessions).ids,['loop']);
});
test('one-minute overlap is rejected, zero/reversed/invalid intervals are refused',()=>{
 assert.equal(overlaps({...sessions[0],endMinute:571},sessions[2]),true);
 for(const s of [{...sessions[0],endMinute:540},{...sessions[0],endMinute:539},{...sessions[0],startMinute:NaN}])assert.equal(valid(s),false);
});
test('full, duplicate and unknown IDs cannot be selected',()=>{
 assert.match(addSession([],'full',sessions).error,/full/);
 assert.match(addSession(['loop'],'loop',sessions).error,/Already/);
 assert.match(addSession([],'unknown',sessions).error,/Unknown/);
});
test('corrupt, non-array, stale and conflicting storage is repaired',()=>{
 for(const value of ['{','null','{}','1'])assert.deepEqual(restoreAgenda(value,sessions),[]);
 assert.deepEqual(restoreAgenda('["loop","loop","choices","full","unknown","spec",2]',sessions),['loop','spec']);
});
test('title and room filters combine, including no matches',()=>{
 assert.deepEqual(filterSessions(sessions,{query:'SPEC',room:'Athena'}).map(s=>s.id),['spec']);
 assert.deepEqual(filterSessions(sessions,{query:'SPEC',room:'Hermes'}),[]);
});
test('favorites toggle independently and restore only valid unique IDs',()=>{
 assert.deepEqual(toggleFavorite(['loop'],'loop'),[]);
 assert.deepEqual(toggleFavorite([],'loop'),['loop']);
 assert.deepEqual(restoreFavorites('["loop","loop","unknown"]',sessions.map(s=>s.id)),['loop']);
 assert.deepEqual(restoreFavorites('{',[]),[]);
});
test('export sorts, preserves exact titles, does not mutate input and handles empty',()=>{
 assert.equal(exportAgenda([]),'');
 const input=[sessions[5],sessions[0]],before=[...input];
 const text=exportAgenda(input);assert.ok(text.indexOf('Opening')<text.indexOf('Ship it'));
 assert.ok(text.includes('Ship it, "carefully" — Αθήνα'));assert.ok(text.includes('09:00–09:30'));
 assert.deepEqual(input,before);
});
test('tie ordering uses stable IDs',()=>{
 const text=exportAgenda([{...sessions[0],id:'z',title:'Zed'},{...sessions[0],id:'a',title:'Alpha'}]);
 assert.ok(text.indexOf('Alpha')<text.indexOf('Zed'));
});
