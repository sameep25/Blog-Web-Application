import grid from "gridfs-stream"; //Easily stream files to and from MongoDB GridFS.
import mongoose from "mongoose";

const url = "http://localhost:8000";

// for converting binary image to string
let gfs, gridfsBucket;
const conn = mongoose.connection;

// checks if connection is open with db
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "fs" });

  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

// upload image or collecting image url from db uploaded through middleware
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ msg: "file not found" });
    }
    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
  } catch (error) {
    return res.status(400).json({ msg: "error while uploading file in db" });
  }
};

//get image from db
export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id); //return stream or chunk
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
