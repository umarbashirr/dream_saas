require("dotenv").config();
import { app } from "./app";
import { connect } from "./db";

connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  });
