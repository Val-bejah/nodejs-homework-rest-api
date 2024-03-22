// const mongoose = require("mongoose");

// const app = require("./app");
// const { DB_HOST, PORT } = process.env;

// mongoose.set("strictQuery,true");

// mongoose
//   .connect(DB_HOST)
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     })
//   )
//   .catch((error) => {
//     console.error(error.message);
//     process.exit(1);
//   });

const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

mongoose.disconnect();

module.exports = mongoose.connection;
