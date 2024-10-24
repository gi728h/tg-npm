const { StringSession } = require('telegram/sessions');
const { TelegramClient } = require('telegram');
const express = require('express');
require('dotenv').config();


const apiId = process.env.API_ID || 0;
const apiHash = process.env.API_HASH || "";
const stringSession = new StringSession(process.env.SESSION_STRING); // fill this later with the value from session.save()
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  (async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start();
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    const data = await client.sendMessage("me", { message: "Hello!" });
    console.log(data);
  })();
  return "Message sent!";
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000! : http://localhost:3000');
});




