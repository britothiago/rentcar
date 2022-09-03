import AWS from "aws-sdk";
import fs from "fs";
import { resolve } from "path";
import { AppError } from "../errors/AppError";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
});

export const sendFilesToAWS = async (file) => {
  const fileContent = fs.readFileSync(file.path);
  if (file.size > 2000001) {
    fs.promises.unlink(file.path);
    throw new AppError("File exceeds size limit");
  }
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: file.filename,
      Body: fileContent,
      ContentType: "image/png",
    };
    const data = await s3.upload(uploadParams).promise();
    fs.promises.unlink(file.path);
    return data.Location;
  }

  fs.promises.unlink(file.path);
  throw new AppError("Invalid file type", 401);
};
