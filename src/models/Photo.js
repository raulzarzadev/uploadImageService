const { Schema, model } = require("mongoose");

const Photo = new Schema(
  {
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    tags: Array
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Photo", Photo);
