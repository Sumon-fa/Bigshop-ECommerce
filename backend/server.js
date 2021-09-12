const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to uncaughtException");

  process.exit(1);
});

//setting up config file
dotenv.config({ path: "backend/config/config.env" });
//connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
// unhandled promise rejection handling
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
