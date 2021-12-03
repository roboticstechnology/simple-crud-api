import { Person } from '../models/person.model.js'


let personDB = [
    new Person('Alex', 25, ['JSON Senior Developer, MOONSHINE Wathcer']),
    new Person('Lina', 27, ['ТikToker 80 lvl']),
    new Person('Paha', 32, ['crypto currency trader'])
];

export class dtoPerson {

    static getAll = () => personDB;

    static getById = id => personDB.find(el => el.id === id);

    static creat = person => {
         console.log(person)
        let result = new Person(person.name, person.age, person.hobbies);
        personDB.push(result);
        return result;
    };

    static update = (id, person) => {
        let personUpd;
        personDB = personDB.map(el => {
            if (el.id === id) {
                personUpd = el = { ...el, ...person };
                return el;
            }
            return el;
        });
        return personUpd;
    };

    static remove = id => {
        let result;
        personDB = personDB.filter(el => {
            if (el.id !== id) return true;
            result = true;
        });
        return result;
    };
}