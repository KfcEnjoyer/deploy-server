const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());


app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
}));

app.use(express.json());

const db = require("./models");

// Routers
const profile = require("./routes/Profile");
app.use('/profile', profile);
const authRoute = require('./routes/Authenticate');
app.use('/auth', authRoute);
const openAccount = require("./routes/openAccount");
app.use("/openaccount", openAccount);
const transfer = require("./routes/Transfer");
app.use("/transfer", transfer);
const details = require("./routes/AccountDetails");
app.use("/accounts", details);
const transaction = require("./routes/Transaction");
app.use("/transactions", transaction);
const stocks = require('./routes/Stocks');
app.use('/api/stocks', stocks);



db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});