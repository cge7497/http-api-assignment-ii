const users = {};

const respondJSON = (request, response, status, jsonObject) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  // If there is JSON to be sent back, write it to the response body.
  if (jsonObject) response.write(JSON.stringify(jsonObject));
  response.end();
};

// send response JSON header. It has no body, as this is for HEAD requests.
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

// sends back the users JSON object.
const getUsers = (request, response) => {
  const responseJSON = { users };
  respondJSON(request, response, 200, responseJSON);
};

// sends back a 200 success code.
const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

// sends back a 404 error and a body with a message and id.
const getNotReal = (request, response) => {
  const statusCode = 404;
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, statusCode, responseJSON);
};

// only sends header data of the notReal page. (So just a 404 error).
const getNotRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

// adds a user to the user JSON object if the required queryParams are sent.
const addUser = (request, response, queryParams) => {
  let statusCode = 201;
  let responseJSON;
  const { name } = queryParams;
  const { age } = queryParams;
  if (name && age) {
    // If the user already exists, update it.
    if (users[name]) {
      statusCode = 204;
      users[name].age = age;
    } else {
      users[name] = { name, age };
      responseJSON = {
        message: 'Created Successfully',
      };
    }
  } else {
    responseJSON = {
      message: 'Name and age are both required.',
      id: 'addUserMissingParams',
    };
    statusCode = 400;
  }

  respondJSON(request, response, statusCode, responseJSON);
};

// sends back an error code and message if the user requests a page that isn't already handled.
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  getUsersMeta,
  getNotReal,
  getNotRealMeta,
  addUser,
  notFound,
};
