// Vercel serverless entry (plain JS so `tsc` skips it; esbuild bundles it).
// The Express app is bundled to CommonJS and exported as the function handler.
const { createApp } = require("./app.js");

module.exports = createApp();
