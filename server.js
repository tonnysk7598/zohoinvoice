const express = require('express');
const fetch = require('node-fetch');
var request = require("request");

const app = express();
app.use(express.json());

const port = 5000;

const config = require('./config.json');

const client_id = config.SELF_CLIENT_CLIENT_ID;
const client_secret = config.SELF_CLIENT_CLIENT_SECRET;
const code = config.SELF_CLIENT_TEMPORARY_GRANT_TOKEN;
const redirect = config.REDIRECT_URI;
const grand = config.GRAND_TYPE;
const mainUrl = 'https://accounts.zoho.com/oauth/v2/token';
const orgId = config.ORG_ID;

var oAuthRefToken = null;
var accessToken = null;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/authenticate', async (req, res) => {
  if (oAuthRefToken == null) {
    const url = `${mainUrl}?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect}&grant_type=${grand}`
    const resp = await fetch(url, {
      method: 'post',
    })
    const allTokens = await resp.json();
    if (allTokens.refresh_token) {
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
  accessToken = getAccessTokenByRefreshToken.access_token
}

app.get('/getAllContacts', async (req, res) => {

  fetch(config.CONTACTS_MAIN_URL, {
    headers: {
      "Authorization": `Zoho-oauthtoken ${accessToken}`,
      "X-com-zoho-invoice-organizationid": `${orgId}`,
      "Content-Type": "multipart/form-data"
    }
  })
    .then(res => res.json())
    .then(data => {
      res.send(data.contacts);
    });
});

app.post('/createNewContact', async (req, res) => {
  const { contactName, companyName, email, mobile } = req.body;
  const contactData = {
    contact_name: contactName,
    company_name: companyName,
    "contact_persons": [{ email, mobile }],
  }
  var options =
  {
    method: 'POST',
    url: config.CONTACTS_MAIN_URL,
    qs: { organization_id: orgId },
    headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}`, 'content-type': 'multipart/form-data;' },
    formData: {
      JSONString: JSON.stringify(contactData)
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response);
  });
});

app.post('/deleteContact', async (req, res) => {
  const { contactId } = req.body;
  var options =
  {
    method: 'DELETE',
    url: `${config.CONTACTS_MAIN_URL}/${contactId}`,
    qs: { organization_id: orgId },
    headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}`, 'content-type': 'multipart/form-data;' },
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response);
  });
});

app.put('/updateContact', async (req, res) => {
  const { contactName, companyName, contactId, email, mobile } = req.body;
  const contactData = {
    contact_name: contactName,
    company_name: companyName,
    "contact_persons": [{ email, mobile }],
  }
  var options =
  {
    method: 'PUT',
    url: `${config.CONTACTS_MAIN_URL}/${contactId}`,
    qs: { organization_id: orgId },
    headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}`, 'content-type': 'multipart/form-data;' },
    formData: {
      JSONString: JSON.stringify(contactData)
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response);
  });
});

app.post('/updateStatus', async (req, res) => {
  const { status, contactId } = req.body;
  console.error(contactId)
  if(status === 'active') {
    var options =
    {
      method: 'POST',
      url: `https://invoice.zoho.com/api/v3/contacts/${contactId}/active`,
      qs: { organization_id: orgId },
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}`, 'content-type': 'multipart/form-data;' },
    };
    console.error(options)
    request(options, function (error, response, body) { 
      if (error) throw new Error(error);
      console.error(error)
      res.send(response);
    });
  } else {
    var option =
    {
      method: 'POST',
      url: `https://invoice.zoho.com/api/v3/contacts/${contactId}/inactive`,
      qs: { organization_id: orgId },
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}`, 'content-type': 'multipart/form-data;' },
    };
    console.error(option)
    request(option, function (error, response, body) { 
      if (error) throw new Error(error);
      console.error(body)
      res.send(response);
    });
  }
});