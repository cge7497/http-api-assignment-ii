const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const responseHandler = require('./responseHandler.js');
const { parse } = require('path');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': responseHandler.getUsers,
    '/notReal': responseHandler.getNotReal,
    notFound: responseHandler.notFound
  },
  'HEAD': {
    '/getUsers': responseHandler.getUsersMeta,
    '/notReal': responseHandler.getNotRealMeta,
    notFound: responseHandler.notFound,
  },
  'POST': {
    '/addUser': responseHandler.addUser
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const queryParams = query.parse(parsedUrl.query);
  const type = request.headers.accept;

  console.dir(parsedUrl.pathname);
  let method = request.method;
  if (!request.method) method = 'GET'; //defaults to a GET method as described in assignment

  if (urlStruct[method][parsedUrl.pathname]) {
    urlStruct[method][parsedUrl.pathname](request, response, queryParams);
  } else {
    urlStruct[method].notFound(request, response, type);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});