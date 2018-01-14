var credentials = {
  client: {
    id: '3b39afe8-4da0-4c3b-b825-6fe4a353de98',
    secret: 'XXXXXXXXX',
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
};
var oauth2 = require('simple-oauth2').create(credentials);

var redirectUri = 'http://localhost:3000/authComplete.html';

// The scopes the app requires
var scopes = ['openid',
  'offline_access',
  'https://outlook.office.com/calendars.readwrite'];

function getAuthUrl() {
  var returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  });
  console.log('Generated auth url: ' + returnVal);
  return returnVal;
}

exports.getAuthUrl = getAuthUrl;


function getTokenFromCode(auth_code, callback, response) {
  var token;
  oauth2.authorizationCode.getToken({
    code: auth_code,
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  }, function (error, result) {
    if (error) {
      console.log('Access token error: ', error.message);
      callback(response, error, null);
    } else {
      token = oauth2.accessToken.create(result);
      console.log('Token created: ', token.token);
      callback(response, null, token);
    }
  });
}

exports.getTokenFromCode = getTokenFromCode;



function refreshAccessToken(refreshToken, callback) {
  var tokenObj = oauth2.accessToken.create({ refresh_token: refreshToken });
  tokenObj.refresh(callback);
}

exports.refreshAccessToken = refreshAccessToken;
