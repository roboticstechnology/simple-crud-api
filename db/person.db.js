import { Person } from '../models/person.model.js'


let personDB = [
    new Person('Alex', 25, ['JSON Senior Developer, MOONSHINE Wathcer']),
    new Person('Lina', 27, ['ТikToker 80 lvl']),
    new Person('Paha', 32, ['crypto currency trader'])
];

export class dtoPerson {

    static getAll = () => personDB;

    static getById = id => personDB.find(el => el.id === id);

    static creat = person => { personDB.push(new Person({ preson })) };

    static update = (id, person) => {
        personDB = personDB.map(el => {
            if (el.id === id) return el = { ...el, ...person };
            return el;
        });
    };

    static remove = id => {
        personDB = personDB.filter(el => el.id !== id)
    };
}