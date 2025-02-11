import Ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { DOWNLOAD_DIR, MAX_THREADS, UPLOAD_DIR } from "../config/config.js";

async function convertMovToMp4(movFilePath: string, mp4FilePath: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		try {
			if (!fs.existsSync(movFilePath)) {
				throw new Error(`Input file not found: ${movFilePath}`);
			}

			const outputDir = path.dirname(mp4FilePath);
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir);
			}

			Ffmpeg(movFilePath)
				.format("mp4")
				.videoCodec("libx264")
				// Change the number of threads to match the number of CPU cores
				// I specified 2 to save some resources on my thin VPS
				.withOutputOptions([`-threads ${MAX_THREADS}`, "-preset ultrafast"])
				.on("end", () => {
					console.log(`Conversion finished: ${movFilePath} -> ${mp4FilePath}`);
					fs.unlink(movFilePath, (err) => {
						if (err) console.error("Error deleting file:", err);
					});
					resolve();
				})
				.on("error", (err) => {
					// We are not deleting the input file here to allow for debugging
					// fs.unlink(movFilePath, (err) => console.error("Error deleting file:", err));

					console.error(`Error during conversion: ${err.message}`);
					reject(err);
				})
				.on("progress", (progressData) => {
					const progress = progressData.percent;

					if (progress) console.log(`Processing: ${progress}%`);
					else console.log("Most likely we are processing non-video file...");
				})
				.save(mp4FilePath);
		} catch (error) {
			console.error("General Error:", error);
			reject(error);
		}
	});
}

export async function processFile(movFile: string): Promise<string> {
	// Make mp4 path
	const mp4File = movFile.replace(".mov", ".mp4").replace(UPLOAD_DIR, DOWNLOAD_DIR);

	try {
		await convertMovToMp4(movFile, mp4File);
		return mp4File;
	} catch (error) {
		console.error("File Conversion failed:", error);
		throw error;
	}
}
