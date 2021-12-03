import http from 'http';
import url from 'url';
import dotenv from 'dotenv';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { dtoPerson } from './db/person.db.js';
import { URLValidtor, pathParamsValidator } from './validators/validator.js';
import { CustomException } from './exceptions/CustomExceptions.js';

dotenv.config();

const log = console.log;
const { HOST, PORT } = process.env;

const server = http.createServer((req, res) => {
    const { path } = url.parse(req.url, true);
    let pathArr = path.split('/').filter(el => el !== '');
    const { method } = req;
    // log('pathArr = ', pathArr, 'method=', method);
    try {

        URLValidtor(pathArr);

        if (pathArr.length === 1) {

            if (method === 'GET') {
                if (path === '/' + pathArr.join('/')) {
                    const result = dtoPerson.getAll();
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                }
            }

            if (method === 'POST') {
                if (path === '/' + pathArr.join('/')) {
                    req.on('data', data => {
                        try {
                            const person = JSON.parse(data);
                            pathParamsValidator(person);
                            const newPerson = dtoPerson.creat(person);
                            res.statusCode = 201;
                            res.end(JSON.stringify(newPerson));
                        } catch (e) {
                            if (e instanceof CustomException) {
                                res.statusCode = e.statusCode;
                                res.end(e.message);
                            } else {
                                res.statusCode = 500;
                                res.end(e.message);
                            }
                        }

                    });
                }
            }
        }

        if (pathArr.length === 2) {
            if (method === 'GET') {
                const result = dtoPerson.getById(pathArr[1]);
                if (result) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                } else {
                    res.statusCode = 404;
                    res.end('Person is not found');
                }
            }

            if (method === 'DELETE') {
                const result = dtoPerson.remove(pathArr[1]);
                if (result) {
                    res.statusCode = 204;
                    res.end('okok');
                } else {
                    res.statusCode = 404;
                    res.end('Person is not found');
                }
            }

            if (method === 'PUT') {
                req.on('data', data => {
                    try {
                        const personUpdateFields = JSON.parse(data);
                        // log(personUpdateFields);
                        const updPerson = dtoPerson.update(pathArr[1], personUpdateFields);
                        if (updPerson) {
                            res.statusCode = 200;
                            res.end(JSON.stringify(updPerson));
                        } else {
                            res.statusCode = 404;
                            res.end('Person is not found');
                        }
                    } catch (e) {
                        if (e instanceof CustomException) {
                            res.statusCode = e.statusCode;
                            res.end(e.message);
                        } else {
                            res.statusCode = 500;
                            res.end(e.message);
                        }
                    }
                });
            }

        }


    } catch (e) {
        log(e.message);
        if (e instanceof CustomException) {
            res.statusCode = e.statusCode;
            res.end(e.message);
        } else {
            res.statusCode = 500;
            res.end(e.message);
        }
    }
});

server.listen(PORT, HOST, () => {
    log(`Server listening http://${HOST}:${PORT}`);
});
