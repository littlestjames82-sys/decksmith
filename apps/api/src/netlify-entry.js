// Netlify Function entry (built at build time by `pnpm --filter @decksmith/api netlify:bundle`).
// Wraps the Express app with serverless-http for the Lambda runtime.
const serverless = require("serverless-http");
const { createApp } = require("./app");

module.exports.handler = serverless(createApp());
