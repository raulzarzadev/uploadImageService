const mongoose = require("mongoose");

//console.log(process.env);

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("uploadImageDB is connected"))
  .catch((err) => console.error(err));
