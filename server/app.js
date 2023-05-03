import http from 'http'
import {connectDB} from "./connectDB.js";
import {LinkController} from "./controllers/Link.controller.js";


const hostname = process.env.APP_IP || 'localhost';
const port = process.env.APP_PORT || 3000;
const protocol = 'https://'

const server = http.createServer(async (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
    };
    console.log(req.method, req.url)
    if(req.url === '/links' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200, headers);

        const data = await LinkController.getAllLinks();
        res.end(JSON.stringify(data, null, 2));
    }
    else if(req.url === '/link' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const postData = JSON.parse(body);
                console.log(postData);
                const return_data = await LinkController.addLink(postData)
                res.writeHead(200, {'Content-Type': 'text/plain'}, headers);
                res.end('Post received: ' + JSON.stringify(return_data, null, 2));

            } catch (err) {
                res.end(JSON.stringify(err))
            }
        });
    }
    else if(req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200, headers);
        res.end('server start')
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const data = await LinkController.matchLink({
            link:  'https://fast-link.na4u.ru' + req.url
        })
        if(data.length > 0) {
            res.writeHead(301, {
                Location: `${data[0].url}`,
            }).end(JSON.stringify(data[0]) + ' success redirect');
        }
        else {
            res.writeHead(200, headers);
            res.end('wrong redirect' + JSON.stringify(data))

        }
    }

});



server.listen(port, hostname, () => {
    console.log(`Server running at ${protocol}${hostname}:${port}/`);
});

