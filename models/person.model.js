import { v4 as uuidv4 } from 'uuid';

export class Person {
    constructor(name, age, hobbies = []) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
}