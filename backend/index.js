const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key":process.env.PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    console.error("Error:", e); // Log the detailed error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(3001);
