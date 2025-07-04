const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
