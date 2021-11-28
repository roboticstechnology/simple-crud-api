// import { getAll, getById, update, remove } from "./service/person.service.js";
import { dtoPerson } from "./db/person.db.js";

const log = console.log;

let persons = dtoPerson.getAll();
log('pesons = ', persons);
let id0 = persons[0]['id']
let id1 = persons[1]['id']
log('id0 =', id0);
dtoPerson.remove(id0);
let personsAfterRemove = dtoPerson.getAll();
log('personsAfterRemove = ', personsAfterRemove);
dtoPerson.update(id1, { age: 40 });
let personsAfterUpdate = dtoPerson.getAll();
log('personsAfterUpdate = ', personsAfterUpdate);




