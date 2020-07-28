const express = require("express");
const db = require("./models");
const exphbs = require("express-handlebars");
const cocktailcontroller = require("./controllers/cocktails");
const htmlcontroller = require("./controllers/html");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./controllers/cocktails.js")(app);
require("./controllers/html.js")(app);
cocktailcontroller(app);
htmlcontroller(app);

db.sequelize.sync();
// Starting our Express app
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
