import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { Filesystem, Directory } from "@capacitor/filesystem";
import Cookies from "js-cookie";

const bucket = "bosuutap";
const client = new S3Client({
  region: "us-east-1",
  endpoint: "https://q0w7.sg.idrivee2-43.com",
  credentials: {
    accessKeyId: "8OBl9ve6KBiLAdnIReel",
    secretAccessKey: "RwoILuzZVKcRhtFfvXFSZqf6vHkPeF5eeWYvviy5",
  },
});

export async function listObjects() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
    });

    const response = await client.send(command);
    if (response.Contents) {
      const shuffledContents = response.Contents.sort(
        () => Math.random() - 0.5
      );
      Cookies.set("s3-objects-" + bucket, JSON.stringify(shuffledContents));
      return shuffledContents;
    }
    return response.Contents;
  } catch (error) {
    const cachedData = Cookies.get("s3-objects-" + bucket);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData.sort(() => Math.random() - 0.5);
    }
    throw error;
  }
}

export async function getObject(key: string) {
  try {
    const localFile = await Filesystem.readFile({
      path: `videos/${key}`,
      directory: Directory.Data,
    });
    const blob = new Blob([localFile.data], { type: "video/mp4" });
    return URL.createObjectURL(blob);
  } catch {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await client.send(command);
    const arrayBuffer = await response.Body?.transformToByteArray();

    if (arrayBuffer) {
      const blob = new Blob([arrayBuffer], { type: "video/mp4" });
      await Filesystem.writeFile({
        path: `videos/${key}`,
        data: blob,
        directory: Directory.Data,
        recursive: true,
      });

      return URL.createObjectURL(blob);
    }
    throw new Error("Failed to get object from S3");
  }
}
