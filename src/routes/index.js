const { Router } = require("express");
const router = Router();

const Photo = require("../models/Photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  const photos = await Photo.find();
  console.log(photos);
  res.json({ message: "images", ok: true, images: photos });
});

router.post("/upload", async (req, res) => {
  const { title } = req.body;
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      tags: ["NegDelBar", "negocios"],
    });
    //console.log("res", result);

    const newPhoto = new Photo({
      title,
      imageURL: result.url,
      public_id: result.public_id,
      tags: result.tags,
    });
    await newPhoto.save();
    res.json({ message: "uploaded", ok: true, image: newPhoto });
    await fs.unlink(req.file.path);
  } catch (err) {
    res.json({ message: "uploaded fail", ok: false });
    console.log(err);
  }
});

router.get("/images/delete/:photo_id", async (req, res) => {
  const { photo_id } = req.params;
  const photo = await Photo.findByIdAndDelete(photo_id);
  const result = await cloudinary.v2.uploader.destroy(photo.public_id);
  res.json({ message: "deleted", ok: true });
});

/* router.get('/images/delete/:public_id' , (req, res) => {
    cloudinary.v2.uploade
}) */

module.exports = router;
