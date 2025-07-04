const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {
  console.log(`Server is running on port ${port}`);
});
