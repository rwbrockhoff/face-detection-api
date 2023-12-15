const clarifaiVariables = require("../clarifaiVariables");

// Generate JSON string for request with api variables + image url
const renderString = (imageURL) => {
  const { USER_ID, APP_ID } = clarifaiVariables;
  return JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
          },
        },
      },
    ],
  });
};

// Create requestOptions object with JSON body including image url
const renderRequestOptions = (imageURL) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + clarifaiVariables.PAT,
    },
    body: renderString(imageURL),
  };
};

module.exports = { renderRequestOptions };
