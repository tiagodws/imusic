const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, 'dist', 'imusic')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'dist', 'imusic', 'index.html'))
);
app.listen(port);

console.info(`Server started on port ${port}`);
