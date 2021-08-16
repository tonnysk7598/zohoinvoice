const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;

const config = require('./config.json');
const urls = require('./urlList.json');

const client_id = config.SELF_CLIENT_CLIENT_ID;
const client_secret = config.SELF_CLIENT_CLIENT_SECRET;
const code = config.SELF_CLIENT_TEMPORARY_GRANT_TOKEN;
const redirect = config.REDIRECT_URI;
const grand = config.GRAND_TYPE;
const mainUrl = 'https://accounts.zoho.com/oauth/v2/token';
const orgId= config.ORG_ID;

var oAuthRefToken = null;
var accessToken = null;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/authenticate', async (req, res) => {
  if(oAuthRefToken == null){
    const url = `${mainUrl}?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect}&grant_type=${grand}`
    const resp = await fetch(url, {
        method: 'post',
    })
    const allTokens = await resp.json();
    if(allTokens.refresh_token) {
      oAuthRefToken = allTokens.refresh_token
      getAccessToken(allTokens.refresh_token)
    }
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  } else {
    getAccessToken(oAuthRefToken)
  }
});

async function getAccessToken(refresh_token) {
    const url2 = `${mainUrl}?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect}&grant_type=refresh_token`
    const resp2 = await fetch(url2, { method: 'post' })
    const getAccessTokenByRefreshToken = await resp2.json()
    accessToken=getAccessTokenByRefreshToken.access_token
}

app.get('/getAllContacts', async (req, res) => {

  fetch(urls.getAllContacts, { headers:   {
    "Authorization": `Zoho-oauthtoken ${accessToken}`,
    "X-com-zoho-invoice-organizationid": `${orgId}`,
    "Content-Type": "multipart/form-data"
  } })
    .then( res => res.json() )
    .then( data => {
      res.send(data);
    });
});