import {LinkController} from "./controllers/Link.controller.js";

class Router {

    get = async (res, headers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200, headers);

        const data = await LinkController.getAllLinks();
        res.end(JSON.stringify(data, null, 2));
    }
    post = async (req, res, headers) => {
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
}
export const RouterController = new Router();