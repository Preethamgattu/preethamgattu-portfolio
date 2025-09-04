import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jsforce from "jsforce"; // Salesforce SDK
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(bodyParser.json());

let conn = null;

// ⚡ Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve React frontend build
app.use(express.static(path.join(__dirname, "dist")));

// 🔹 OAuth callback (Salesforce redirects here after login)
app.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  conn = new jsforce.Connection({
    oauth2: {
      loginUrl: "https://login.salesforce.com", // or test.salesforce.com for sandbox
      clientId: process.env.SF_CLIENT_ID,
      clientSecret: process.env.SF_CLIENT_SECRET,
      redirectUri: process.env.SF_CALLBACK_URL,
    },
  });

  try {
    await conn.authorize(code);
    res.send("✅ Salesforce Connected Successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Salesforce Auth Failed");
  }
});

// 🔹 API to create a Lead from portfolio form
app.post("/api/create-lead", async (req, res) => {
  if (!conn) {
    return res.status(400).send("❌ Salesforce not connected yet");
  }

  const { name, email, message } = req.body;

  try {
    const result = await conn.sobject("Lead").create({
      LastName: name || "No Name",
      Company: "Portfolio Submission",
      Email: email,
      Description: message,
    });
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

// 🔹 Serve React SPA for all other routes
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
