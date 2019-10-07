const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const { store } = require("./client/src/api/payslipData");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/storePayslip", (req, res) => {
  try {
    store(req.body);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === "Already Added") {
      return res.sendStatus(500);
    }
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
