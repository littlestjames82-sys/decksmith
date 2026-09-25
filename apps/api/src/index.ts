import { createApp } from "./app.js";

const app = createApp();
const PORT = process.env.PORT || 3001;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Decksmith API running on http://0.0.0.0:${PORT}`);
});
