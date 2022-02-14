let users = {};

const respondJSON = (request, response, status, jsonObject) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(jsonObject));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  // send response JSON header. It has no body, as this is for HEAD requests.
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = { users: users};
  respondJSON(request, response, 200, responseJSON);
}

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
}

const getNotReal = (request, response) => {
  let statusCode = 404;
  let showID = true;
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound'
  };
  respondJSON(request, response, statusCode, responseJSON);
};

const getNotRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
}


const addUser = (request, response, queryParams) => {
  let statusCode = 201;
  let responseJSON;
  if (queryParams.name && queryParams.age) {
    if (users[name]) statusCode = 204;
  }
  else {
    responseJSON = {
      message: "Name and age are both required.",
      id: "addUserMissingParams"
    };
    statusCode = 400;
  }

  respondJSON(request, response, statusCode, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers, getUsersMeta,
  getNotReal, getNotRealMeta,
  addUser,
  notFound,
};
