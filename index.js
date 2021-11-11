const express = require('express');
const webpush = require('web-push');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static path
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey =
  'BPMrvWDxlTMJJ3A-EHBp0zI_yujvwrM-NvOqK1TuHMqpqRGTbWd1eyEYGBEnxM04zUQq4S22qOB00_sFI8O-vNo';
const privateVapidKey = 'vYii5tjF9iizjF2kSAnEZ6UgPPwzbr_v2ZZswWN_5H8';

webpush.setVapidDetails(
  'mailto:alphatesting776@gmail.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe routes to
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Important Notification' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
