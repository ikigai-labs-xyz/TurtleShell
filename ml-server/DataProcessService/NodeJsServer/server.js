const express = require("express");
const { parseContract } = require("./parseContract");

const app = express();
const PORT = 8512;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/v1/api/parse", (req, res) => {
  const data = req.body;
  target_contract = data.target_contract;
  tokens = parseContract(target_contract);
  res.send(tokens);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
