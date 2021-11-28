import { personDB } from '../db/person.db.js';

export const getAll = () => personDB;

export const getById = id => { /../ };

export const creat = person => { /../ };

export const update = (id, person) => { /../ };

export const remove = id => { personDB = personDB.filter(el => { el.id !== id }) };