const mongoose = require("mongoose");

const db = () => {
  const nodeEnv = process.env.NODE_ENV;
  console.log(nodeEnv);

  let dbAddress =
    nodeEnv === "development"
      ? process.env.TEST_DB_ADDRESS
      : process.env.DB_ADDRESS.replace(
          "<USER>",
          process.env.DB_ADDRESS_USER
        ).replace("<PASSWORD>", process.env.DB_ADDRESS_PASSWORD);

  mongoose.connect(dbAddress).then(console.log("DB Connected Successfully!"));
};

module.exports = db;
