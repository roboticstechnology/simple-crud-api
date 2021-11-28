import http from 'http';
import url from 'url';

import dotenv from 'dotenv'

dotenv.config();

const log = console.log;
const { HOST, PORT } = process.env;




const server = http.createServer((req, res) => {
    const { path } = url.parse(req.url, true);
    const { method } = req;
    if (method === 'GET') {
        if( path === '/'){
            log( 'get all')
        }
    }


    log(path, method)
});

server.listen(PORT, HOST, () => {
    log(`Server listening http://${HOST}:${PORT}`);
});
