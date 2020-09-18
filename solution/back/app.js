const express = require('express');
const controller = require('./controller');
const BASE_URI = '/v1';

const app = express();

app.get(`${BASE_URI}/health`, (req, res) => {
  res.send('up and running\n');
});

app.get(`${BASE_URI}/songs/:albumOrArtist`, controller);
/**
 * Custom page not found handler 
 */
app.use((req, res) => {
  const NOT_FOUND_MESSAGE = `Page Not Found: ${req.originalUrl}\n`;
  // TODO: add some persistent logging logic
  res.status(404).send(NOT_FOUND_MESSAGE);
});

/**
 * Custom server error handler
 */
app.use((error, req, res, next) => {
  const INTERNAL_SERVER_ERROR = `Internal Server Error: ${error}`;
  // TODO: add some persistent logging logic
  res.status(500).send(INTERNAL_SERVER_ERROR);
});

/** 
 * Custom server fatal error handler
 */
function handleFatalError(err) {
  const FATAL_ERROR = `Fatal Error: ${err.message}`;
  // TODO: add some persistent logging logic
  process.exit();
}

process.on('unhandledRejection', handleFatalError);
process.on('uncaughtException', handleFatalError);

module.exports = app;