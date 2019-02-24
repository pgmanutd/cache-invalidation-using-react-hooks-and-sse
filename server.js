const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/stream', (req, res) => {
  res.status(200).set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  console.log('Client added');

  const intervalId = setInterval(() => {
    console.log('Data sent');

    res.write('data: { "invalidateCache": true }\n\n');
  }, 10000);

  req.on('close', () => {
    console.log('Client removed');

    clearInterval(intervalId);
  });
});

app.listen(3001);

console.log('Server started!!');
