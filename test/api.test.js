import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const log = console.log;

const { HOST, PORT } = process.env;
const URL_API = `http://${HOST}:${PORT}`;

let persons;

describe('CASE_0. get all persons, get oneById person, update one person, getById use incorrect uuid -> get exception with code 400', () => {

    describe('GET /person', () => {
        it('should get status 200 & array persons', async () => {
            const response = await request(URL_API).get('/person');
            persons = JSON.parse(response.text)
            expect(response.status).toBe(200);
            expect(persons.length).toBe(3);

        });
    });

    describe('GET /person/:id', () => {
        it('should get status 200  person by id', async () => {
            const response = await request(URL_API).get(`/person/${persons[0]['id']}`);
            expect(response.status).toBe(200);
            expect(JSON.parse(response.text)['id']).toBe(persons[0]['id']);
        });
    });

    describe('PUT /person/:id', () => {
        it('should get status 200  update person by id', async () => {
            const response = await request(URL_API).put(`/person/${persons[0]['id']}`).send({ age: 666 });
            expect(response.status).toBe(200);
            expect(JSON.parse(response.text)['age']).toBe(666);
        });
    });

    describe('GET /person/:id', () => {
        it('should get status 400, uuid is invalid', async () => {
            const response = await request(URL_API).get(`/person/${persons[0]['id'] + 'q'}`);
            expect(response.status).toBe(400);
        });
    });

});

describe('CASE_1 get all persons, get oneById person, delete one person, getById where id is not found -> get code 404', () => {

    describe('GET /person', () => {
        it('should get status 200 & array persons', async () => {
            const response = await request(URL_API).get('/person');
            persons = JSON.parse(response.text)
            expect(response.status).toBe(200);
            expect(persons.length).toBe(3);

        });
    });

    describe('GET /person/:id', () => {
        it('should get status 200  person by id', async () => {
            const response = await request(URL_API).get(`/person/${persons[0]['id']}`);
            expect(response.status).toBe(200);
            expect(JSON.parse(response.text)['id']).toBe(persons[0]['id']);
        });
    });

    describe('DELETE /person/:id', () => {
        it('should get status 204  delete person by id', async () => {
            const response = await request(URL_API).delete(`/person/${persons[0]['id']}`);
            expect(response.status).toBe(204);
        });
    });

    describe('GET /person/:id', () => {
        it('should get status 404  person by id, where id is not found', async () => {
            const response = await request(URL_API).get(`/person/${persons[0]['id']}`);
            expect(response.status).toBe(404);
        });
    });

});

describe('CASE_2 get all persons, creat new person, get all persons, update where uuid is incorrect -> get exception with code 400', () => {

    describe('GET /person', () => {
        it('should get status 200 & array persons size 2', async () => {
            const response = await request(URL_API).get('/person');
            persons = JSON.parse(response.text)
            expect(response.status).toBe(200);
            expect(persons.length).toBe(2);

        });
    });

    describe('POST /person', () => {
        it('should get status 201 new person', async () => {
            const response = await request(URL_API).post(`/person`).send({ name: "Max", age: 666, hobbies: [] });
            expect(response.status).toBe(201);
        });
    });

    describe('GET /person', () => {
        it('should get status 200 & array persons size 3', async () => {
            const response = await request(URL_API).get('/person');
            persons = JSON.parse(response.text)
            expect(response.status).toBe(200);
            expect(persons.length).toBe(3);

        });
    });

    describe('PUT /person/:id', () => {
        it('should get status 400 use incorrect uuid', async () => {
            const response = await request(URL_API).put(`/person/${persons[0]['id'] + 'q'}`).send({ age: 666 });
            expect(response.status).toBe(400);
        });
    });

});