const { StringSession } = require('telegram/sessions');
const { TelegramClient } = require('telegram');
const express = require('express');
const readline = require('node:readline');
const CronJob = require('cron').CronJob;
require('dotenv').config();


const apiId = process.env.API_ID || 0;
const apiHash = process.env.API_HASH || "";
const stringSession = new StringSession(process.env.SESSION_STRING); // fill this later with the value from session.save()
const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let message = ""

const job = new CronJob(
  '0 30 5 * * *', // cronTime

  // This runs every day at 7:30 PM.
  // The pattern is:
  //  sec (0-59)  min (0-59)  hour (0-23)  day of month (1-31)  month (0-11)  day of week (0-6)
  //  The month pattern is a bit weird, 0 is January and 11 is December.
  function () {
    try {
      (async () => {
        console.log("Loading interactive example...");
        const client = new TelegramClient(stringSession, apiId, apiHash, {
          connectionRetries: 5,
        });
        await client.start();
        console.log("You should now be connected.");
        console.log(client.session.save()); // Save this string to avoid logging in again
        const data1 = await client.sendMessage("-1001546838749", { message: "/grow@DickGrowerBot" });
        const data2 = await client.sendMessage("-1001546838749", { message: "/shipping@SHIPPERINGbot" });
        const data3 = await client.sendMessage("-1001546838749", { message: "/dick_of_day@DickGrowerBot" });
        const data4 = await client.sendMessage("-1001546838749", { message: "/grow@DickGrowerBot" });
      })();
      message = "Message sent! at " + new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });      
    }catch (e) {
      message = "Error: " + e
    }
	}, // onTick
  null, // onComplete
  true, // start
  'Asia/Calcutta' // timeZone
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send(message);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000! : http://localhost:3000');
});




