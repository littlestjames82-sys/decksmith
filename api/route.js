// Vercel serverless function entry. The Express app bundle is generated at
// build time by `pnpm --filter @decksmith/api vercel:bundle` -> api/_app.cjs.
module.exports = require("./_app.cjs");
