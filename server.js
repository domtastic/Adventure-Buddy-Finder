const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let PORT = process.env.PORT || 8080;
// parse application/x-www-form-urlencoded
// make sure exteneded is true or there will be an issue parsing data
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
