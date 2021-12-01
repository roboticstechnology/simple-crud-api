import http from 'http';
import url from 'url';
import dotenv from 'dotenv'
import { validate as uuidValidate } from 'uuid';

import { dtoPerson } from './db/person.db.js'

dotenv.config();

const log = console.log;
const { HOST, PORT } = process.env;

const uuidValidateV4 = uuid => uuidValidate(uuid) && uuidVersion(uuid) === 4;



class CustomException extends Error {

    constructor(name, message, statusCode) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }

}

const URLValidtor = urlArr => {
    if (urlArr.length > 2) throw new CustomException('Invalid URL', 'resource is not found', 404);

    if (urlArr.length === 2) {

        if (urlArr[0] !== 'person') throw new CustomException('Invalid URL', 'resource is not found', 404);

        if (!uuidValidateV4(urlArr[1])) throw new CustomException('Invalid PESON ID', 'PERSON ID is Invalid', 400);

    }

    if (urlArr.length === 1 && urlArr[0] !== 'person') throw new CustomException('Invalid URL', 'resource is not found', 404);
}

const server = http.createServer((req, res) => {
    const { path } = url.parse(req.url, true);
    let pathArr = path.split('/').filter(el => el !== '');
    const { method } = req;
    log('pathArr = ', pathArr, 'method=', method);
    try {

        URLValidtor(pathArr);
        
        if (method === 'GET') {
            if (path === '/person') {
                const result = dtoPerson.getAll();
                res.statusCode = 200;
                res.end(JSON.stringify(result));
            }
            //if()
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

server.listen(PORT, HOST, () => {
    log(`Server listening http://${HOST}:${PORT}`);
});
